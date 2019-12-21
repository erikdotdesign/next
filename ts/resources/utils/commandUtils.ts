export const getSelectedArtboard = (selectedPage: any) => {
  return selectedPage.layers.find((layer: any) => {
    if (layer.type === 'Artboard' && layer.selected) {
      return layer;
    }
  });
};

export const flattenGroups = (layers: any, newArray: any) => {
  if (layers.length > 0) {
    layers.forEach((layer: any) => {
      if (layer.type === 'Group') {
        flattenGroups(layer.layers, newArray);
      } else {
        newArray.push(layer);
      }
    });
  }
  return newArray;
}

export const getLayerImages = (layers: any) => {
  const layerImages: any = [];
  layers.forEach((layer: any) => {
    if (layer.type === 'Image') {
      layerImages.push(layer.image);
    }
  });
  return layerImages;
}

export const getLayerFills = (layers: any) => {
  const fills: any = [];
  layers.forEach((layer: any) => {
    if (layer.style.fills.length > 0) {
      fills.push(...layer.style.fills);
    }
  });
  return fills;
};

export const getFillImages = (fills: any) => {
  const fillImages: any = [];
  fills.forEach((fill: any) => {
    if (fill.pattern.image !== null) {
      fillImages.push(fill.pattern.image);
    }
  });
  return fillImages;
};

export const convertImages = (images: any) => {
  return images.map((image: any) => {
    let newImageBase64 = image.nsdata.base64EncodedStringWithOptions(0);
    let newImage = 'data:image/png;base64,' + newImageBase64;
    return {
      id: image.id,
      url: newImage
    }
  });
};

export const getConvertedImages = (layers: any) => {
  const flattendLayers = flattenGroups(layers, []);
  const layerImages: any = getLayerImages(flattendLayers);
  const layerFills: any = getLayerFills(flattendLayers);
  const fillImages: any = getFillImages(layerFills);
  const convertedLayerImages: any = convertImages(layerImages);
  const convertedfillImages: any = convertImages(fillImages);
  return [...convertedLayerImages, ...convertedfillImages];
}