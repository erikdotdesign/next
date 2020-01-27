const shapeToSVG = (page: srm.Page, layer: srm.SketchLayer, sketch: srm.Sketch): srm.AppAsset => {
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
    formats: 'svg',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    overwriting: true
  });
  // remove asset artboard from page
  assetArtboard.remove();
  // return AppAsset
  return {
    id: layer.id,
    // @ts-ignore
    src: `${NSTemporaryDirectory()}${assetDuplicate.id}.svg`
  }
}

const createTempSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.AppAsset[] = []): srm.AppAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        createTempSVGs(page, (<srm.Group>layer).layers, sketch, svgs);
      } else if (layer.type === 'Shape') {
        const svg = shapeToSVG(page, layer, sketch);
        svgs.push(svg);
      } else if (layer.type === 'ShapePath') {
        const hasOpenPath: boolean = !(<srm.ShapePath>layer).closed;
        const notRectangle: boolean = (<srm.ShapePath>layer).shapeType !== 'Rectangle';
        const notOval: boolean = (<srm.ShapePath>layer).shapeType !== 'Oval';
        const isOddShape: boolean = notRectangle && notOval;
        if (hasOpenPath || isOddShape) {
          const svg = shapeToSVG(page, layer, sketch);
          svgs.push(svg);
        }
      }
    });
  }
  return svgs;
};

const getSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch) => {
  let shapeSvgs: srm.AppAsset[] = createTempSVGs(page, layers, sketch);
  return shapeSvgs;
};

export default getSVGs;