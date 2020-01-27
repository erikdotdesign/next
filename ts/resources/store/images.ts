import { exportWholeAsset } from './index';

const createTempFillImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, images: srm.AppAsset[] = []): srm.AppAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        createTempFillImages(page, (<srm.Group>layer).layers, sketch, images);
      } else if (layer.type === 'Shape' || layer.type === 'ShapePath') {
        (<srm.Shape | srm.ShapePath>layer).style.fills.forEach((fill: srm.Fill) => {
          if (fill.pattern.image !== null && fill.enabled) {
            const imageWidth = fill.pattern.image.nsimage.size().width;
            const imageHeight = fill.pattern.image.nsimage.size().height;
            // create image from fill image
            let fillImage = new sketch.Image({
              image: fill.pattern.image,
              frame: {
                width: imageWidth,
                height: imageHeight,
                x: 0,
                y: 0
              }
            });
            // push image to layers
            layers.push(fillImage);
            // get whole image
            const wholeImage = exportWholeAsset(page, fillImage, fill.pattern.image.id, 'png', sketch);
            // add image to store
            images.push(wholeImage);
            // remove image from layers
            fillImage.remove();
          }
        });
      }
    });
  }
  return images;
};

const createTempLayerImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, images: srm.AppAsset[] = []): srm.AppAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        createTempLayerImages(page, (<srm.Group>layer).layers, sketch, images);
      } else if (layer.type === 'Image') {
        const image = exportWholeAsset(page, layer, (<srm.Image>layer).image.id, 'png', sketch);
        images.push(image);
      }
    });
  }
  return images;
};

const gradientToImage = (page: srm.Page, layer: srm.Shape | srm.ShapePath, id: string, sketch: srm.Sketch): srm.AppAsset => {
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
  // return whole image
  return exportWholeAsset(page, layer, id, 'png', sketch);
};

const createTempGradientImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, images: srm.AppAsset[] = []): srm.AppAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        createTempGradientImages(page, (<srm.Group>layer).layers, sketch, images);
      } else if (layer.type === 'Shape' || layer.type === 'ShapePath') {
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
          const gradientImage = gradientToImage(page, layerDuplicate, layer.id, sketch);
          // push base64 gradient to images
          images.push(gradientImage);
          // remove duplicate
          layerDuplicate.remove();
        }
      }
    });
  }
  return images;
};

const getImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch): srm.AppAsset[] => {
  const layerImages: srm.AppAsset[] = createTempLayerImages(page, layers, sketch);
  const fillImages: srm.AppAsset[] = createTempFillImages(page, layers, sketch);
  const gradientImages: srm.AppAsset[] = createTempGradientImages(page, layers, sketch);
  return [...layerImages, ...fillImages, ...gradientImages];
};

export default getImages;