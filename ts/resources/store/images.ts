const imageLayerToImage = (page: srm.Page, layer: srm.SketchLayer, sketch: srm.Sketch): srm.AppAsset => {
  // exporting an asset with dims that exceed the artboard dims,
  // will only export the portion within the artboard
  // solution: create artboard for each asset to make sure,
  // whole asset is exported
  const assetArtboard = new sketch.Artboard({
    name: `${layer.id}-asset-artboard`,
    frame: layer.frame,
    parent: page,
    layers: [layer.duplicate()]
  });
  // get asset from artboard
  const assetDuplicate = assetArtboard.layers[0];
  // reset asset position on artboard
  assetDuplicate.frame.x = 0;
  assetDuplicate.frame.y = 0;
  // export asset to temp folder
  sketch.export(assetDuplicate, {
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    ['save-for-web']: true,
    overwriting: true
  });
  // remove asset artboard from page
  assetArtboard.remove();
  // return AppAsset
  return {
    id: (<srm.Image>layer).image.id,
    // @ts-ignore
    src: `${NSTemporaryDirectory()}${assetDuplicate.id}.png`
  }
}

const fillGradientToImage = (page: srm.Page, layer: srm.Shape | srm.ShapePath, sketch: srm.Sketch) => {
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
    // @ts-ignore
    src: `${NSTemporaryDirectory()}${gradientImage.id}.png`
  }
}

const fillImageToImage = (page: srm.Page, image: srm.ImageData, sketch: srm.Sketch) => {
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
    // @ts-ignore
    src: `${NSTemporaryDirectory()}${fillImage.id}.png`
  }
}

const createTempImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, images: srm.AppAsset[] = []): srm.AppAsset[] => {
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

const getImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch): srm.AppAsset[] => {
  const layerImages: srm.AppAsset[] = createTempImages(page, layers, sketch);
  return layerImages;
};

export default getImages;