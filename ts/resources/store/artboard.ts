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

// const createMaskGroups = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch): void => {
//   if (layers.length > 0) {
//     layers.forEach((layer: srm.SketchLayer) => {
//       const hasClippingMask: boolean = layer.sketchObject.hasClippingMask();
//       if (hasClippingMask) {
//         const maskIndex = layer.index;
//         const maskParent = layer.parent;
//         // get mask shape
//         const maskShape = getMaskShape(layer);
//         // flatten shape if polygon, star, or triangle
//         const flatMaskShape = createMaskLayer(maskShape as srm.Shape | srm.ShapePath, sketch);
//         // add prefix to name
//         // add offset to group if flat mask shape if slimmer than mask shape
//         const maskGroupOffset = flatMaskShape.frame.width !== maskShape.frame.width
//                                 ? (maskShape.frame.width - flatMaskShape.frame.width) / 2
//                                 : maskShape.frame.x;
//         // create new group to mimic mask behavior
//         // app will apply overflow hidden to groups with the name srm.mask
//         const maskGroup = new sketch.Group({
//           name: 'srm.mask',
//           frame: {
//             ...flatMaskShape.frame,
//             x: maskGroupOffset
//           },
//           layers: [flatMaskShape]
//         });
//         // splice in mask group, splice out old mask
//         maskParent.layers.splice(maskIndex, 1, maskGroup);
//         // if mask is a group, push group layers to mask group
//         if (layer.type === 'Group') {
//           (layer as srm.Group).layers.forEach((maskedLayer: srm.SketchLayer) => {
//             maskGroup.layers.push(maskedLayer);
//           });
//         }
//         // loop through mask parent layers,
//         // any layer with an index higher than the mask will be masked
//         // push masked layers to maskGroup
//         maskParent.layers.forEach((maskedLayer: srm.SketchLayer, index: number) => {
//           if (index > maskIndex) {
//             maskedLayer.frame.x = maskedLayer.frame.x - maskGroup.frame.x;
//             maskedLayer.frame.y = maskedLayer.frame.y - maskGroup.frame.y;
//             maskGroup.layers.push(maskedLayer);
//           }
//         });
//       } else if (layer.type === "Group") {
//         createMaskGroups(page, (<srm.Group>layer).layers, sketch);
//       }
//     });
//   }
// };

const createMaskGroup = (layer: srm.SketchLayer, sketch: srm.Sketch, callback: any): void => {
  if (layer.sketchObject.hasClippingMask()) {
    const maskIndex = layer.index;
    const maskParent = layer.parent;
    // get mask shape
    const maskShape = getMaskShape(layer);
    // flatten shape if polygon, star, or triangle
    const flatMaskShape = createMaskLayer(maskShape as srm.Shape | srm.ShapePath, sketch);
    // add prefix to name
    // add offset to group if flat mask shape if slimmer than mask shape
    const maskGroupOffset = flatMaskShape.frame.width !== maskShape.frame.width
                            ? (maskShape.frame.width - flatMaskShape.frame.width) / 2
                            : maskShape.frame.x;
    // create new group to mimic mask behavior
    // app will apply overflow hidden to groups with the name srm.mask
    const maskGroup = new sketch.Group({
      name: 'srm.mask',
      frame: {
        ...flatMaskShape.frame,
        x: maskGroupOffset
      },
      layers: [flatMaskShape]
    });
    // splice in mask group, splice out old mask
    maskParent.layers.splice(maskIndex, 1, maskGroup);
    // if mask is a group, push group layers to mask group
    if (layer.type === 'Group') {
      (layer as srm.Group).layers.forEach((maskedLayer: srm.SketchLayer) => {
        maskGroup.layers.push(maskedLayer);
      });
    }
    // loop through mask parent layers,
    // any layer with an index higher than the mask will be masked
    // push masked layers to maskGroup
    maskParent.layers.forEach((maskedLayer: srm.SketchLayer, index: number) => {
      if (index > maskIndex) {
        maskedLayer.frame.x = maskedLayer.frame.x - maskGroup.frame.x;
        maskedLayer.frame.y = maskedLayer.frame.y - maskGroup.frame.y;
        maskGroup.layers.push(maskedLayer);
      }
    });
    // return callback
    return callback(layer);
  } else {
    return callback(layer);
  }
};

const flattenGroups = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === "Group") {
        layer.sketchObject.ungroup();
        flattenGroups((<srm.Group>layer).layers);
      }
    });
  }
};

// const roundFrameDimensions = (layers: srm.SketchLayer[]): void => {
//   if (layers.length > 0) {
//     layers.forEach((layer: srm.SketchLayer) => {
//       layer.frame.x = Math.round(layer.frame.x);
//       layer.frame.y = Math.round(layer.frame.y);
//       layer.frame.width = Math.round(layer.frame.width);
//       layer.frame.height = Math.round(layer.frame.height);
//       if (layer.type === "Group") {
//         roundFrameDimensions((<srm.Group>layer).layers);
//       }
//     });
//   }
// };

const roundFrameDimensions = (layer: srm.SketchLayer, callback: any): void => {
  layer.frame.x = Math.round(layer.frame.x);
  layer.frame.y = Math.round(layer.frame.y);
  layer.frame.width = Math.round(layer.frame.width);
  layer.frame.height = Math.round(layer.frame.height);
  return callback(layer);
};

const isIrrelevantLayer = (layer: srm.SketchLayer): boolean => {
  if (layer.type === 'HotSpot' || layer.type === 'Slice' || layer.type === 'Artboard') {
    return true;
  } else {
    return false;
  }
};

const isRelevantLayer = (layer: srm.SketchLayer, callback: any) => {
  switch(layer.type) {
    case 'Group':
    case 'Shape':
    case 'Image':
    case 'ShapePath':
    case 'Text':
    case 'SymbolInstance':
      return callback(layer);
    default:
      layer.remove();
      return;
  }
};

const isHiddenLayer = (layer: srm.SketchLayer, callback: any) => {
  const isHidden = (<srm.Group | srm.Shape | srm.Image | srm.ShapePath | srm.Text | srm.SymbolInstance>layer).hidden;
  if (!isHidden) {
    return callback(layer);
  } else {
    layer.remove();
    return;
  }
};

const isSymbol = (layer: srm.SketchLayer, callback: any) => {
  if (layer.type === 'SymbolInstance') {
    const detachedGroup = (<srm.SymbolInstance>layer).detach({
      recursively: true
    });
    return callback(detachedGroup);
  } else {
    return callback(layer);
  }
};

const singlePass = (layers: srm.SketchLayer[], sketch: srm.Sketch): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      isRelevantLayer(layer, (step1: any) => {
        isSymbol(step1, (step2: any) => {
          if (step2.id === step1.id) {
            singlePass(step2.layers, sketch);
          } else {
            isHiddenLayer(step2, (step3: any) => {
              createMaskGroup(step3, sketch, (step4: any) => {
                if (step4.type === 'Group') {
                  singlePass(step4.layers, sketch);
                } else {
                  roundFrameDimensions(step4, (step5: any) => {
                    if (step5.type === 'Group') {
                      singlePass(step5.layers, sketch);
                    } else {
                      return;
                    }
                  });
                }
              });
            });
          }
        });
      });
    });
  }
};

const getArtboard = (page: srm.Page, selectedArtboard: srm.Artboard, sketch: srm.Sketch): srm.Artboard => {
  // duplicate artboard
  const artboard: srm.Artboard = selectedArtboard.duplicate();
  // reset duplicated artboard position
  artboard.frame.x = 0;
  artboard.frame.y = 0;
  artboard.background.includedInExport = true;
  singlePass(artboard.layers, sketch);
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