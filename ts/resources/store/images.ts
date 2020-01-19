const createBase64Image = (nsdata: srm.NSData, id: string): srm.Base64Image => {
  let newImageBase64 = nsdata.base64EncodedStringWithOptions(0);
  let newImage = 'data:image/png;base64,' + newImageBase64;
  return {
    id: id,
    src: newImage
  }
};

const base64ImageBatch = (images: srm.ImageData[]): srm.Base64Image[] => {
  return images.map((image: srm.ImageData) => {
    return createBase64Image(image.nsdata, image.id);
  });
};

const layerToBase64 = (layer: srm.SketchLayer, id: string, sketch: srm.Sketch): srm.Base64Image => {
  // create image buffer from layer
  const buffer: srm.Buffer = sketch.export(layer, {
    formats: 'png',
    output: false,
    ['save-for-web']: true
  });
  // create image from buffer data
  const bufferImg: srm.Image = new sketch.Image({
    image: buffer
  });
  // return base64 image
  return createBase64Image(bufferImg.image.nsdata, id);
};

const gradientToBase64 = (layer: srm.Shape | srm.ShapePath, id: string, sketch: srm.Sketch): srm.Base64Image => {
  // get enabled gradients
  const activeGradients: srm.Fill[] = layer.style.fills.filter((fill: srm.Fill) => {
    return fill.enabled && fill.fillType === 'Gradient';
  });
  // get top gradient fill
  const topGradient: srm.Fill = activeGradients[activeGradients.length - 1];
  // only keep layer gradient styles
  layer.style.fills = [topGradient];
  layer.style.borders = [];
  layer.style.shadows = [];
  layer.style.innerShadows = [];
  layer.transform.rotation = 0;
  layer.transform.flippedHorizontally = false;
  layer.transform.flippedVertically = false;
  if (layer.type === 'ShapePath') {
    (<srm.ShapePath>layer).points.forEach((point: srm.CurvePoint) => point.cornerRadius = 0);
  }
  // return base64 image
  return layerToBase64(layer, id, sketch);
};

const getBase64Gradients = (layers: srm.SketchLayer[], sketch: srm.Sketch, images: srm.Base64Image[] = []): srm.Base64Image[] => {
  layers.forEach((layer: srm.SketchLayer) => {
    if (layer.type === 'Shape' || layer.type === 'ShapePath') {
      // check if fills contain any enabled gradients
      const hasActiveGradient: boolean = (<srm.Shape | srm.ShapePath>layer).style.fills.some((fill: srm.Fill) => {
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

const getLayerImages = (layers: srm.SketchLayer[], images: srm.ImageData[] = []): srm.ImageData[] => {
  layers.forEach((layer: srm.SketchLayer) => {
    if (layer.type === 'Image') {
      images.push((<srm.Image>layer).image);
    }
  });
  return images;
};

const getFillImages = (layers: srm.SketchLayer[], images: srm.ImageData[] = []): srm.ImageData[] => {
  layers.forEach((layer: srm.SketchLayer) => {
    if (layer.type === 'Shape' || layer.type === 'ShapePath') {
      (<srm.Shape | srm.ShapePath>layer).style.fills.forEach((fill: srm.Fill) => {
        if (fill.pattern.image !== null && fill.enabled) {
          images.push(fill.pattern.image);
        }
      });
    }
  });
  return images;
};

const getImages = (layers: srm.SketchLayer[], sketch: srm.Sketch): srm.Base64Image[] => {
  // get layers to turn into base64
  const layerImages: srm.ImageData[] = getLayerImages(layers);
  const fillImages: srm.ImageData[] = getFillImages(layers);
  // generate base64 images from layers
  const base64LayerImages: srm.Base64Image[] = base64ImageBatch(layerImages);
  const base64FillImages: srm.Base64Image[] = base64ImageBatch(fillImages);
  const base64Gradients: srm.Base64Image[] = getBase64Gradients(layers, sketch);
  // return final base64 image store
  return [...base64LayerImages, ...base64FillImages, ...base64Gradients];
};

export default getImages;