const shapeToSVG = (page: srm.Page, layer: srm.Shape | srm.ShapePath, sketch: srm.Sketch): srm.SvgAsset => {
  // duplicate layer
  const layerDuplicate = layer.duplicate();
  // set parne to page
  layerDuplicate.parent = page;
  // remove transforms
  // transforms will be applied on the div, not svg
  layerDuplicate.transform.rotation = 0;
  layerDuplicate.transform.flippedHorizontally = false;
  layerDuplicate.transform.flippedVertically = false;
  // export duplicate layer
  sketch.export(layerDuplicate, {
    formats: 'svg',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    overwriting: true
  });
  // remove duplicate layer
  layerDuplicate.remove();
  // return AppAsset
  return {
    id: layer.id,
    // @ts-ignore
    src: `${NSTemporaryDirectory()}${layerDuplicate.id}.svg`
  }
}

const createTempSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.SvgAsset[] = []): srm.SvgAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        createTempSVGs(page, (<srm.Group>layer).layers, sketch, svgs);
      } else if (layer.type === 'Shape') {
        const svg = shapeToSVG(page, layer as srm.Shape, sketch);
        svgs.push(svg);
      } else if (layer.type === 'ShapePath') {
        const hasOpenPath: boolean = !(<srm.ShapePath>layer).closed;
        const notRectangle: boolean = (<srm.ShapePath>layer).shapeType !== 'Rectangle';
        const notOval: boolean = (<srm.ShapePath>layer).shapeType !== 'Oval';
        const isOddShape: boolean = notRectangle && notOval;
        if (hasOpenPath || isOddShape) {
          const svg = shapeToSVG(page, layer as srm.ShapePath, sketch);
          svgs.push(svg);
        }
      }
    });
  }
  return svgs;
};

const getSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch) => {
  let shapeSvgs: srm.SvgAsset[] = createTempSVGs(page, layers, sketch);
  return shapeSvgs;
};

export default getSVGs;