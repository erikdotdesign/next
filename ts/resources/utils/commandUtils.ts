const layerToBase64 = (layer: any, id: any, sketch: any) => {
  // create image buffer from layer
  const buffer = sketch.export(layer, {
    formats: 'png',
    output: false,
    ['save-for-web']: true
  });
  // create image form buffer data
  const bufferImg = new sketch.Image({
    image: buffer
  });
  // return base64 image
  return createBase64Image(bufferImg.image, id);
};

const gradientToBase64 = (layer: any, id: any, sketch: any) => {
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
  // turn layer into base64
  return layerToBase64(layer, id, sketch);
};

const createBase64Image = (image: any, id: string) => {
  let newImageBase64 = image.nsdata.base64EncodedStringWithOptions(0);
  let newImage = 'data:image/png;base64,' + newImageBase64;
  return {
    id: id,
    url: newImage
  }
};

const base64ImageBatch = (images: any) => {
  return images.map((image: any) => {
    return createBase64Image(image, image.id);
  });
};

export const getSelectedArtboard = (selectedPage: any) => {
  return selectedPage.layers.find((layer: any) => {
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
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      if (layer.type === 'Group') {
        getLayerImages(layer.layers, images);
      } else if (layer.type === 'Image' && !layer.hidden) {
        images.push(layer.image);
      }
    });
  }
  return images;
};

const getFillImages = (layers: any, images: any = []) => {
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      if (layer.type === 'Group') {
        getFillImages(layer.layers, images);
      } else if (layer.style.fills.length > 0 && !layer.hidden) {
        layer.style.fills.forEach((fill: any) => {
          if (fill.pattern.image !== null && fill.enabled) {
            images.push(fill.pattern.image);
          }
        });
      }
    });
  }
  return images;
};

const generateBase64Gradients = (layers: any, sketch: any, images: any = []) => {
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      if (layer.type === 'Group') {
        generateBase64Gradients(layer.layers, sketch, images);
      } else if (layer.style.fills.length > 0 && !layer.hidden) {
        // check if fills contain any enabled gradients
        const hasActiveGradient = layer.style.fills.some((fill: any) => {
          return fill.fillType === 'Gradient' && fill.enabled;
        });
        // generate gradient base64
        if (hasActiveGradient) {
          // create duplicate
          const duplicate = layer.duplicate();
          // create base64 from duplicate layer
          const base64Gradient = gradientToBase64(duplicate, layer.id, sketch);
          // push base64 gradient to images
          images.push(base64Gradient);
        }
      }
    });
  }
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

export const getImages = (layers: any, sketch: any) => {
  const images = generateBase64Images(layers);
  const gradients = generateBase64Gradients(layers, sketch)
  return [...images, ...gradients];
};

export const validSelection = (selection: any) => {
  const notEmpty = selection.count() == 1;
  if (notEmpty && selection.firstObject().class() == 'MSArtboardGroup') {
    return true;
  } else {
    return false;
  }
};

// from sketch automate
export const safeToUngroup = (group: any) => {
  let noOpacity = (group.style().contextSettings().opacity() == 1),
      noBlending = (group.style().hasBlending() == 0),
      noShadows = (group.style().hasEnabledShadow() == 0),
      noExportOptions = (group.exportOptions().exportFormats().count() == 0),
      noResizingConstraint = (group.resizingConstraint() == 63);

  return noOpacity && noBlending && noShadows && noResizingConstraint && noExportOptions;
};

// from sketch automate
export const flattenGroup = (layer: any) => {
  if (layer.class() == "MSLayerGroup") {
    if (safeToUngroup(layer)) {
      layer.ungroup();
    }
    for (let i = 0; i < layer.layers().count(); i++) {
      let childLayer = layer.layers().objectAtIndex(i);
      flattenGroup(childLayer);
    }
  }
};

// from sketch automate
export const flattenGroups = (selection: any) => {
  let loop = selection.objectEnumerator();
  let layer;
  while (layer = loop.nextObject()) {
    flattenGroup(layer);
  }
};

export const getArtboard = (sketch: any, context: any) => {
  // get native selection and artboard
  let selection = context.selection;
  let artboard = selection.firstObject();
  // duplicate native artboard
  let artboardDuplicate = artboard.duplicate();
  // reset duplicated artboard position
  artboardDuplicate.frame().setX(0);
  artboardDuplicate.frame().setY(0);
  // detach all symbols from duplicated artboard, returns layer groups
  detachSymbols(sketch.fromNative(artboardDuplicate).layers);
  // flatten all groups within duplicated artboard
  flattenGroups(artboardDuplicate.layers());
  // remove duplicated artboard
  sketch.fromNative(artboardDuplicate).remove();
  // return final artboard
  return sketch.fromNative(artboardDuplicate);
}