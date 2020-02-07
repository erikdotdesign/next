import chroma from 'chroma-js';

const removeIrrelevantLayers = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        removeIrrelevantLayers((<srm.Group>layer).layers);
      } else if (layer.type === 'HotSpot' || layer.type === 'Slice' || layer.type === 'Artboard') {
        layer.remove();
      }
    });
  }
};

const detatchSymbols = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        detatchSymbols((<srm.Group>layer).layers);
      } else if (layer.type === 'SymbolInstance') {
        (<srm.SymbolInstance>layer).detach({
          recursively: true
        });
      }
    });
  }
};

const removeHiddenLayers = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      const hidden = (<srm.Group | srm.Shape | srm.Image | srm.ShapePath | srm.Text | srm.SymbolInstance>layer).hidden;
      if (layer.type === 'Group' && !hidden) {
        removeHiddenLayers((<srm.Group>layer).layers);
      } else if (hidden) {
        layer.remove();
      }
    });
  }
};

const createMaskLayer = (layer: srm.ShapePath | srm.Shape, sketch: srm.Sketch): srm.ShapePath | srm.Shape => {
  // duplicate layer and reset styles
  // layer needs a fill and 100% opacity,
  // to correctly mimic sketch masking
  let duplicate = layer.duplicate();
  // check if layer has active fill
  const activeFills = duplicate.style.fills.filter((fill: srm.Fill) => fill.enabled);
  const topFill = activeFills ? activeFills[activeFills.length - 1] : null;
  // if layer has active fill,
  // return fill at 100% alpha
  if (topFill) {
    topFill.color = `${chroma(topFill.color).alpha(1)}`;
  } else {
    // if layer has no active fill,
    // add black fill
    duplicate.style.fills = [{
      color: '#000',
      fillType: 'Color'
    }];
  }
  duplicate.frame.x = 0;
  duplicate.frame.y = 0;
  duplicate.style.borders = [];
  duplicate.style.shadows = [];
  duplicate.style.innerShadows = [];
  duplicate.style.opacity = 1;
  // flatten shape
  let shapeBuffer = sketch.export(duplicate, {
    formats: 'svg',
    output: false
  });
  let shapeGroup = sketch.createLayerFromData(shapeBuffer, 'svg');
  // get shape in flattened shape group
  let maskShape = shapeGroup.layers[0];
  // rename layer
  maskShape.name = `srm.mask.shape`;
  // remove duplicate
  duplicate.remove();
  // return final mask
  return maskShape;
};

const getMaskShape = (layer: srm.SketchLayer): srm.Shape | srm.ShapePath => {
  let lastLayer = layer;
  while(lastLayer.type === 'Group') {
    lastLayer = (lastLayer as srm.Group).layers[0];
  }
  return lastLayer as srm.ShapePath | srm.Shape;
};

const isMask = (layer: srm.SketchLayer, sketch: srm.Sketch) => {
  return new Promise((resolve, reject) => {
    if (layer && layer.sketchObject.hasClippingMask()) {
      const maskIndex = layer.index;
      const maskParent = layer.parent;
      const maskShape = getMaskShape(layer);
      const flatMaskShape = createMaskLayer(maskShape as srm.Shape | srm.ShapePath, sketch);
      // // add prefix to name
      // // add offset to group if flat mask shape if slimmer than mask shape
      // const maskGroupOffset = flatMaskShape.frame.width !== maskShape.frame.width
      //                         ? (maskShape.frame.width - flatMaskShape.frame.width) / 2
      //                         : maskShape.frame.x;
      // // create new group to mimic mask behavior
      // // app will apply overflow hidden to groups with the name srm.mask
      const maskGroup = new sketch.Group({
        name: 'srm.mask',
        frame: layer.frame,
        layers: [layer.duplicate()]
      });
      // splice in mask group, splice out old mask
      maskParent.layers.splice(maskIndex, 1, maskGroup);
      // // if mask is a group, push group layers to mask group
      // if (layer.type === 'Group') {
      //   (layer as srm.Group).layers.forEach((maskedLayer: srm.SketchLayer) => {
      //     maskGroup.layers.push(maskedLayer);
      //   });
      // }
      // loop through mask parent layers,
      // any layer with an index higher than the mask will be masked
      // push masked layers to maskGroup
      maskGroup.parent.layers.forEach((maskedLayer: srm.SketchLayer, index: number) => {
        if (index > maskIndex) {
          maskedLayer.frame.x = maskedLayer.frame.x - maskGroup.frame.x;
          maskedLayer.frame.y = maskedLayer.frame.y - maskGroup.frame.y;
          maskGroup.layers.push(maskedLayer);
        }
      });
      resolve(maskGroup);
    } else {
      resolve(layer);
    }
  });
};

const roundFrameDimensions = (layer: srm.SketchLayer) => {
  return new Promise((resolve, reject) => {
    if (layer) {
      layer.frame.x = Math.round(layer.frame.x);
      layer.frame.y = Math.round(layer.frame.y);
      layer.frame.width = Math.round(layer.frame.width);
      layer.frame.height = Math.round(layer.frame.height);
    }
    resolve(layer);
  });
};

const isRelevant = (layer: srm.SketchLayer) => {
  return new Promise((resolve, reject) => {
    switch(layer.type) {
      case 'Group':
      case 'Shape':
      case 'Image':
      case 'ShapePath':
      case 'Text':
      case 'SymbolInstance':
        resolve(layer);
        break;
      case 'HotSpot':
      case 'Slice':
      case 'Artboard':
        layer.remove();
        resolve(null);
        break;
    }
  });
};

const isHidden = (layer: srm.SketchLayer) => {
  const isHidden = (<srm.Group | srm.Shape | srm.Image | srm.ShapePath | srm.Text | srm.SymbolInstance>layer).hidden;
  return new Promise((resolve, reject) => {
    if (layer && isHidden) {
      layer.remove();
      resolve(null);
    } else {
      resolve(layer);
    }
  });
};

const processLayers = (artboard: srm.Artboard, sketch: srm.Sketch) => {
  return new Promise((resolve, reject) => {
    let groupPromises: any[] = [];
    let groups: any[] = [artboard];
    let i = 0;
    while (i < groups.length) {
      groupPromises.push(processGroup((groups[i] as srm.Group), sketch));
      groups[i].layers.forEach((layer: srm.SketchLayer) => {
        if (layer.type === 'Group') {
          groups.push(layer);
        } else if (layer.type === 'SymbolInstance') {
          groups.push((<srm.SymbolInstance>layer).detach({
            recursively: true
          }));
        }
      });
      i++;
    }
    Promise.all(groupPromises).then(() => {
      resolve();
    });
  });
};

const processGroup = (group: srm.Artboard | srm.Group, sketch: srm.Sketch) => {
  return new Promise((resolve, reject) => {
    const promises: any = [];
    group.layers.forEach((layer: srm.SketchLayer) => {
      const layerPromise = processLayer(layer, sketch);
      promises.push(layerPromise);
    });
    Promise.all(promises).then(() => {
      resolve();
    });
  });
};

const processLayer = (layer: srm.SketchLayer, sketch: srm.Sketch) => {
  return new Promise((resolve, reject) => {
    isRelevant(layer).then((relevantLayer) => {
      return isHidden(relevantLayer as srm.SketchLayer);
    }).then((visibleLayer) => {
      return isMask(visibleLayer as srm.SketchLayer, sketch);
    }).then((maskedLayer) => {
      return roundFrameDimensions(maskedLayer as srm.SketchLayer);
    }).then((finalLayer) => {
      resolve(finalLayer);
    });
  });
};

const getArtboard = (page: srm.Page, selectedArtboard: srm.Artboard, sketch: srm.Sketch): srm.Artboard => {
  // duplicate artboard
  const artboard: srm.Artboard = selectedArtboard.duplicate();
  // reset duplicated artboard position
  artboard.frame.x = 0;
  artboard.frame.y = 0;
  artboard.background.includedInExport = true;
  processLayers(artboard, sketch);
  // removes hotspots, slices, and artboards
  // removeIrrelevantLayers(artboard.layers);
  // // detach all symbols from artboard, returns layer groups
  // detatchSymbols(artboard.layers);
  // // remove hidden layers
  // removeHiddenLayers(artboard.layers);
  // // create mask groups
  // createMaskGroups(page, artboard.layers, sketch);
  // // round layer frame dimensions
  // roundFrameDimensions(artboard.layers);
  // return final artboard
  return artboard;
};

export default getArtboard;


// const singlePass = (layers: srm.SketchLayer[], sketch: srm.Sketch): void => {
//   if (layers.length > 0) {
//     layers.forEach((layer: srm.SketchLayer, index: number) => {
//       isRelevant(layer).then((relevantLayer) => {
//         return isSymbol(relevantLayer as srm.SketchLayer);
//       }).then((symbolLayer) => {
//         return isHidden(symbolLayer as srm.SketchLayer);
//       }).then((visibleLayer) => {
//         return isMask(visibleLayer as srm.SketchLayer, sketch);
//       }).then((maskedLayer) => {
//         return roundFrameDimensions(maskedLayer as srm.SketchLayer);
//       }).then((roundedLayer) => {
//         if ((roundedLayer as srm.SketchLayer).type === 'Group') {
//           singlePass((roundedLayer as srm.Group).layers, sketch);
//         }
//       }).catch((removedLayer) => {
//         console.log(removedLayer);
//       });
//     });
//   }
// };