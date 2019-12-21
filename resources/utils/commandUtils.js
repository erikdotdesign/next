export const getSelectedArtboard = (selectedPage) => {
    return selectedPage.layers.find((layer) => {
        if (layer.type === 'Artboard' && layer.selected) {
            return layer;
        }
    });
};
export const flattenGroups = (layers, newArray) => {
    if (layers.length > 0) {
        layers.forEach((layer) => {
            if (layer.type === 'Group') {
                flattenGroups(layer.layers, newArray);
            }
            else {
                newArray.push(layer);
            }
        });
    }
    return newArray;
};
export const getLayerImages = (layers) => {
    const layerImages = [];
    layers.forEach((layer) => {
        if (layer.type === 'Image') {
            layerImages.push(layer.image);
        }
    });
    return layerImages;
};
export const getLayerFills = (layers) => {
    const fills = [];
    layers.forEach((layer) => {
        if (layer.style.fills.length > 0) {
            fills.push(...layer.style.fills);
        }
    });
    return fills;
};
export const getFillImages = (fills) => {
    const fillImages = [];
    fills.forEach((fill) => {
        if (fill.pattern.image !== null) {
            fillImages.push(fill.pattern.image);
        }
    });
    return fillImages;
};
export const convertImages = (images) => {
    return images.map((image) => {
        let newImageBase64 = image.nsdata.base64EncodedStringWithOptions(0);
        let newImage = 'data:image/png;base64,' + newImageBase64;
        return {
            id: image.id,
            url: newImage
        };
    });
};
export const getConvertedImages = (layers) => {
    const flattendLayers = flattenGroups(layers, []);
    const layerImages = getLayerImages(flattendLayers);
    const layerFills = getLayerFills(flattendLayers);
    const fillImages = getFillImages(layerFills);
    const convertedLayerImages = convertImages(layerImages);
    const convertedfillImages = convertImages(fillImages);
    return [...convertedLayerImages, ...convertedfillImages];
};
