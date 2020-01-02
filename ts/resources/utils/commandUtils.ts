const layerToBase64 = (layer: any, id: string, sketch: any) => {
  // create image buffer from layer
  const buffer = sketch.export(layer, {
    formats: 'png',
    output: false,
    ['save-for-web']: true
  });
  // create image from buffer data
  const bufferImg = new sketch.Image({
    image: buffer
  });
  // return base64 image
  return createBase64Image(bufferImg.image, id);
};

const gradientToBase64 = (layer: any, id: string, sketch: any) => {
  // get enabled gradients
  const activeGradients = layer.style.fills.filter((fill: any) => {
    return fill.enabled && fill.fillType === 'Gradient';
  });
  // get top gradient fill
  const topGradient = activeGradients[activeGradients.length - 1];
  // only keep layer gradient styles
  layer.style.fills = [topGradient];
  layer.style.borders = [];
  layer.style.shadows = [];
  layer.style.innerShadows = [];
  // return base64 image
  return layerToBase64(layer, id, sketch);
};

const createBase64Image = (image: any, id: string) => {
  let newImageBase64 = image.nsdata.base64EncodedStringWithOptions(0);
  let newImage = 'data:image/png;base64,' + newImageBase64;
  return {
    id: id,
    src: newImage
  }
};

const base64ImageBatch = (images: any) => {
  return images.map((image: any) => {
    return createBase64Image(image, image.id);
  });
};

export const getSelectedArtboard = (selectedLayers: any) => {
  return selectedLayers.layers.find((layer: any) => {
    return layer.type === 'Artboard' && layer.selected;
  });
};

const detachSymbols = (layers: any) => {
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      if (layer.type === 'Group') {
        detachSymbols(layer.layers);
      } else if (layer.type === 'SymbolInstance') {
        layer.detach({
          recursively: true
        });
      }
    });
  }
};

const getLayerImages = (layers: any, images: any = []) => {
  layers.forEach((layer: any) => {
    if (layer.type === 'Image') {
      images.push(layer.image);
    }
  });
  return images;
};

const getFillImages = (layers: any, images: any = []) => {
  layers.forEach((layer: any) => {
    if (layer.style.fills.length > 0) {
      layer.style.fills.forEach((fill: any) => {
        if (fill.pattern.image !== null && fill.enabled) {
          images.push(fill.pattern.image);
        }
      });
    }
  });
  return images;
};

const generateBase64Gradients = (layers: any, sketch: any, images: any = []) => {
  layers.forEach((layer: any) => {
    if (layer.style.fills.length > 0 && !layer.hidden) {
      // check if fills contain any enabled gradients
      const hasActiveGradient = layer.style.fills.some((fill: any) => {
        return fill.fillType === 'Gradient' && fill.enabled;
      });
      // generate gradient base64
      if (hasActiveGradient) {
        // duplicate layer
        // all styles but the gradient will be removed
        const layerDuplicate = layer.duplicate();
        // create base64 from duplicate layer
        const base64Gradient = gradientToBase64(layerDuplicate, layer.id, sketch);
        // push base64 gradient to images
        images.push(base64Gradient);
        // remove duplicate
        layerDuplicate.remove();
      }
    }
  });
  return images;
};

const generateBase64Images = (layers: any) => {
  // get layers to turn into base64
  const layerImages: any = getLayerImages(layers);
  const fillImages: any = getFillImages(layers);
  // generate base64 images from layers
  const base64LayerImages: any = base64ImageBatch(layerImages);
  const base64FillImages: any = base64ImageBatch(fillImages);
  // return final base64 image store
  return [...base64LayerImages, ...base64FillImages];
};

export const validSelection = (selection: any) => {
  const notEmpty = selection.count() == 1;
  if (notEmpty && selection.firstObject().class() == 'MSArtboardGroup') {
    return true;
  } else {
    return false;
  }
};

const flattenGroups = (layers: any) => {
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      if (layer.type === "Group") {
        layer.sketchObject.ungroup();
        flattenGroups(layer.layers);
      }
    });
  }
};

export const removeHiddenLayers = (layers: any) => {
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      const hidden = layer.hidden;
      const transparent = layer.style.opacity === 0;
      if (layer.type === 'Group') {
        if (hidden || transparent) {
          layer.remove();
        } else {
          removeHiddenLayers(layer.layers);
        }
      } else {
        if (hidden || transparent) {
          layer.remove();
        }
      }
    });
  }
};

export const flattenShapes = (layers: any, sketch: any) => {
  layers.forEach((layer: any, index: number) => {
    if (layer.type === 'Shape') {
      // create svg buffer
      const buffer = sketch.export(layer, {
        formats: 'svg',
        output: false
      });
      // create layer from buffer
      const shapeGroup = sketch.createLayerFromData(buffer, 'svg');
      // find new shape
      const newShape = sketch.find(`Shape`, shapeGroup)[0];
      // set new shape frame and style to match old
      newShape.frame = layer.frame;
      newShape.style = layer.style;
      // splice in new shape, splice out old shape
      layers.splice(index, 1, newShape);
    }
  });
};

export const getOddShapePathSVGs = (layers: any, svgs: any = {}) => {
  layers.forEach((layer: any) => {
    if (layer.type === 'ShapePath') {
      const hasOpenPath = !layer.closed;
      const notRectangle = layer.shapeType !== 'Rectangle';
      const notOval = layer.shapeType !== 'Oval';
      const isOddShape = notRectangle && notOval;
      if (hasOpenPath || isOddShape) {
        // duplicate layer
        const newLayer = layer.duplicate();
        // set frame position to 0 0
        // this insures svg path starts at 0 0
        newLayer.frame.x = 0;
        newLayer.frame.y = 0;
        // get path from duplicated layer
        const path = newLayer.getSVGPath();
        // add path to svgs
        svgs[`${layer.id}`] = path;
        // remove duplicated layer
        newLayer.remove();
      }
    }
  });
  return svgs;
};

export const getShapeSVGs = (layers: any, svgs: any = {}) => {
  layers.forEach((layer: any) => {
    if (layer.type === 'Shape') {
      // a shape is composed on many shapePaths
      // get all the svg paths of the shape's shapePaths
      const paths = layer.layers.map((shapePath: any) => {
        return shapePath.getSVGPath();
      });
      // return the combined path of all the shapePaths
      svgs[`${layer.id}`] = paths.join(' ');
    }
  });
  return svgs;
};

const maskGroupToImageLayer = (maskGroup: any, sketch: any) => {
  // create image buffer from layer
  const buffer = sketch.export(maskGroup, {
    formats: 'png',
    output: false,
    ['save-for-web']: true
  });
  // create image layer from buffer data
  const imageLayer = new sketch.Image({
    name: 'masked-group',
    image: buffer
  });
  // set image layer frame to match mask group frame
  imageLayer.frame = maskGroup.frame;
  // return image layer
  return imageLayer;
};

export const masksToImages = (layers: any, sketch: any) => {
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      const hasClippingMask = layer.sketchObject.hasClippingMask();
      const hasParentGroup = layer.parent && layer.parent.type === 'Group';
      if (layer.type === 'Group') {
        masksToImages(layer.layers, sketch);
      } else if (hasClippingMask && hasParentGroup) {
        const parent = layer.parent;
        const parentIndex = parent.index;
        const parentsParent = parent.parent;
        const imageLayer = maskGroupToImageLayer(parent, sketch);
        // splice in new image, splice out old mask group
        parentsParent.layers.splice(parentIndex, 1, imageLayer);
      }
    });
  }
};

export const roundFrameDimensions = (layers: any) => {
  layers.forEach((layer: any) => {
    layer.frame.x = Math.round(layer.frame.x);
    layer.frame.y = Math.round(layer.frame.y);
    layer.frame.width = Math.round(layer.frame.width);
    layer.frame.height = Math.round(layer.frame.height);
  });
}

export const getArtboard = (sketch: any) => {
  let document = sketch.getSelectedDocument();
  let selectedLayers = document.selectedLayers;
  let baseArtboard = getSelectedArtboard(selectedLayers);
  // duplicate artboard
  let artboard = baseArtboard.duplicate();
  // reset duplicated artboard position
  artboard.frame.x = 0;
  artboard.frame.y = 0;
  // detach all symbols from artboard, returns layer groups
  detachSymbols(artboard.layers);
  // remove hidden layers
  removeHiddenLayers(artboard.layers);
  // turn masks into image layers
  masksToImages(artboard.layers, sketch);
  // flatten all groups
  flattenGroups(artboard.layers);
  // flatten shapes
  flattenShapes(artboard.layers, sketch);
  // round layer frame dimensions
  roundFrameDimensions(artboard.layers);
  // return final artboard
  return artboard;
};

export const getStore = (sketch: any) => {
  // get artboard
  let artboard = getArtboard(sketch);
  // get images
  let images = generateBase64Images(artboard.layers);
  let gradients = generateBase64Gradients(artboard.layers, sketch);
  let shapeSvgs = getShapeSVGs(artboard.layers);
  let oddShapePathSvgs = getOddShapePathSVGs(artboard.layers);
  // remove duplicate artboard
  artboard.remove();
  // return final store
  return {
    artboard: artboard,
    images: [...images, ...gradients],
    svgs: {...shapeSvgs, ...oddShapePathSvgs}
  }
};


// export const shapesToImages = (layers: any, sketch: any) => {
//   layers.forEach((layer: any, index: number) => {
//     if (layer.type === 'Shape') {
//       // create image layer
//       const imageLayer = layerToImageLayer(layer, sketch);
//       // push image layer to original layer index
//       layers.splice(index, 1, imageLayer);
//     }
//   });
// }

// export const oddShapePathsToImages = (layers: any, sketch: any) => {
//   layers.forEach((layer: any, index: number) => {
//     if (layer.type === 'ShapePath') {
//       const hasOpenPath = !layer.closed;
//       const notRectangle = layer.shapeType !== 'Rectangle';
//       const notOval = layer.shapeType !== 'Oval';
//       const isOddShape = notRectangle && notOval;
//       if (hasOpenPath || isOddShape) {
//         // create image layer
//         const imageLayer = layerToImageLayer(layer, sketch);
//         // push image layer to original layer index
//         layers.splice(index, 1, imageLayer);
//       }
//     }
//   });
// };

// const layerToImageLayer = (layer: any, sketch: any) => {
//   // create image buffer from layer
//   const buffer = sketch.export(layer, {
//     formats: 'png',
//     output: false,
//     ['save-for-web']: true
//   });
//   // create image layer from buffer data
//   const imageLayer = new sketch.Image({
//     name: 'shape-image',
//     image: buffer
//   });
//   // set image layer frame and index to original layer
//   imageLayer.frame = layer.frame;
//   // return image layer
//   return imageLayer;
// };