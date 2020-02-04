const imageLayerToImage = (page: srm.Page, layer: srm.SketchLayer, sketch: srm.Sketch): srm.ImgAsset => {
  const layerDuplicate = layer.duplicate();
  // reset asset position on artboard
  layerDuplicate.parent = page;
  // export asset to temp folder
  sketch.export(layerDuplicate, {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    ['save-for-web']: true,
    overwriting: true
  });
  // remove asset artboard from page
  layerDuplicate.remove();
  // return AppAsset
  return {
    id: (<srm.Image>layer).image.id,
    src: {
      // @ts-ignore
      [`1x`]: `${NSTemporaryDirectory()}${layerDuplicate.id}.png`,
      // @ts-ignore
      [`2x`]: `${NSTemporaryDirectory()}${layerDuplicate.id}@2x.png`
    },
  }
}

const fillGradientToImage = (page: srm.Page, layer: srm.Shape | srm.ShapePath, sketch: srm.Sketch): srm.ImgAsset => {
  // get enabled gradients
  const activeGradients: srm.Fill[] = layer.style.fills.filter((fill: srm.Fill) => {
    return fill.enabled && fill.fillType === 'Gradient';
  });
  // get top gradient fill
  const topGradient: srm.Fill = activeGradients[activeGradients.length - 1];
  // create new layer with gradient
  const gradientImage = new sketch.ShapePath({
    parent: page,
    frame: layer.frame,
    style: {
      fills: [topGradient],
      borders: []
    }
  });
  // export image to temp dir
  sketch.export(gradientImage, {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    ['save-for-web']: true,
    overwriting: true
  });
  // remove image from page
  gradientImage.remove();
  // return final image
  return {
    id: layer.id,
    src: {
      // @ts-ignore
      [`1x`]: `${NSTemporaryDirectory()}${gradientImage.id}.png`,
      // @ts-ignore
      [`2x`]: `${NSTemporaryDirectory()}${gradientImage.id}@2x.png`,
    }
  }
}

const fillImageToImage = (page: srm.Page, image: srm.ImageData, sketch: srm.Sketch): srm.ImgAsset => {
  // get image size
  const width = image.nsimage.size().width;
  const height = image.nsimage.size().height;
  // create image from fill image
  const fillImage = new sketch.Image({
    image: image,
    parent: page,
    frame: { width, height, x: 0, y: 0 }
  });
  // export image to temp dir
  sketch.export(fillImage, {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    ['save-for-web']: true,
    overwriting: true
  });
  // remove image from page
  fillImage.remove();
  // return final image
  return {
    id: image.id,
    src: {
      // @ts-ignore
      [`1x`]: `${NSTemporaryDirectory()}${fillImage.id}.png`,
      // @ts-ignore
      [`2x`]: `${NSTemporaryDirectory()}${fillImage.id}@2x.png`
    }
  }
}

const createTempImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, images: srm.ImgAsset[] = []): srm.ImgAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        createTempImages(page, (<srm.Group>layer).layers, sketch, images);
      } else if (layer.type === 'Image') {
        const image = imageLayerToImage(page, layer, sketch);
        images.push(image);
      } else if (layer.type === 'Shape' || layer.type === 'ShapePath') {
        (<srm.Shape | srm.ShapePath>layer).style.fills.forEach((fill: srm.Fill) => {
          if (fill.pattern.image !== null && fill.enabled) {
            // create image from fill image
            const fillImage = fillImageToImage(page, fill.pattern.image, sketch);
            // push final image
            images.push(fillImage);
          } else if (fill.fillType === 'Gradient' && fill.enabled) {
            // create gradient image
            const gradientImage = fillGradientToImage(page, layer as srm.ShapePath | srm.Shape, sketch);
            // push final image
            images.push(gradientImage);
          }
        });
      }
    });
  }
  return images;
};

const getImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch): srm.ImgAsset[] => {
  const layerImages: srm.ImgAsset[] = createTempImages(page, layers, sketch);
  return layerImages;
};

export default getImages;