const layerToBase64 = (layer, id, sketch) => {
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
const gradientToBase64 = (layer, id, sketch) => {
    // get enabled gradients
    const activeGradients = layer.style.fills.filter((fill) => {
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
const createBase64Image = (image, id) => {
    let newImageBase64 = image.nsdata.base64EncodedStringWithOptions(0);
    let newImage = 'data:image/png;base64,' + newImageBase64;
    return {
        id: id,
        url: newImage
    };
};
const base64ImageBatch = (images) => {
    return images.map((image) => {
        return createBase64Image(image, image.id);
    });
};
export const getSelectedArtboard = (selectedPage) => {
    return selectedPage.layers.find((layer) => {
        return layer.type === 'Artboard' && layer.selected;
    });
};
const detachSymbols = (layers) => {
    if (layers.length > 0) {
        layers.forEach((layer) => {
            if (layer.type === 'Group') {
                detachSymbols(layer.layers);
            }
            else if (layer.type === 'SymbolInstance') {
                layer.detach({
                    recursively: true
                });
            }
        });
    }
};
const getLayerImages = (layers, images = []) => {
    if (layers.length > 0) {
        layers.forEach((layer) => {
            if (layer.type === 'Group') {
                getLayerImages(layer.layers, images);
            }
            else if (layer.type === 'Image' && !layer.hidden) {
                images.push(layer.image);
            }
        });
    }
    return images;
};
const getFillImages = (layers, images = []) => {
    if (layers.length > 0) {
        layers.forEach((layer) => {
            if (layer.type === 'Group') {
                getFillImages(layer.layers, images);
            }
            else if (layer.style.fills.length > 0 && !layer.hidden) {
                layer.style.fills.forEach((fill) => {
                    if (fill.pattern.image !== null && fill.enabled) {
                        images.push(fill.pattern.image);
                    }
                });
            }
        });
    }
    return images;
};
const generateBase64Gradients = (layers, sketch, images = []) => {
    if (layers.length > 0) {
        layers.forEach((layer) => {
            if (layer.type === 'Group') {
                generateBase64Gradients(layer.layers, sketch, images);
            }
            else if (layer.style.fills.length > 0 && !layer.hidden) {
                // check if fills contain any enabled gradients
                const hasActiveGradient = layer.style.fills.some((fill) => {
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
const generateBase64Images = (layers) => {
    // get layers to turn into base64
    const layerImages = getLayerImages(layers);
    const fillImages = getFillImages(layers);
    // generate base64 images from layers
    const base64LayerImages = base64ImageBatch(layerImages);
    const base64FillImages = base64ImageBatch(fillImages);
    // return final base64 image store
    return [...base64LayerImages, ...base64FillImages];
};
export const getImages = (layers, sketch) => {
    const images = generateBase64Images(layers);
    const gradients = generateBase64Gradients(layers, sketch);
    return [...images, ...gradients];
};
export const validSelection = (selection) => {
    const notEmpty = selection.count() == 1;
    if (notEmpty && selection.firstObject().class() == 'MSArtboardGroup') {
        return true;
    }
    else {
        return false;
    }
};
// from sketch automate
export const flattenGroup = (layer) => {
    if (layer.class() == "MSLayerGroup") {
        layer.ungroup();
        for (let i = 0; i < layer.layers().count(); i++) {
            let childLayer = layer.layers().objectAtIndex(i);
            flattenGroup(childLayer);
        }
    }
};
// from sketch automate
export const flattenGroups = (selection) => {
    let loop = selection.objectEnumerator();
    let layer;
    while (layer = loop.nextObject()) {
        flattenGroup(layer);
    }
};
export const getArtboard = (sketch, context) => {
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
};
