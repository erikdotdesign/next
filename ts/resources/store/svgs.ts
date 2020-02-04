const shapeToSVG = (page: srm.Page, layer: srm.Shape | srm.ShapePath, sketch: srm.Sketch): srm.SvgAsset => {
  let borderSize = 0;
  const activeBorders = layer.style.borders.filter((border: srm.Border) => border.enabled);
  if (activeBorders) {
    activeBorders.forEach((border: srm.Border) => {
      if (border.thickness > borderSize) {
        borderSize = border.thickness;
      }
    });
  }
  // duplicate layer
  const layerDuplicate = layer.duplicate();
  // set parent to page
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
  // update layer frame to include bordersize
  layer.frame.width = Math.round(layer.frame.width + (borderSize * 1.5));
  layer.frame.height = Math.round(layer.frame.height + (borderSize * 1.5));
  layer.frame.x = Math.round(layer.frame.x - ((borderSize * 1.5) / 2));
  layer.frame.y = Math.round(layer.frame.y - ((borderSize * 1.5) / 2));
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
        const hasDashPattern: boolean = (<srm.ShapePath>layer).style.borderOptions.dashPattern.length > 0;
        if (hasOpenPath || isOddShape || hasDashPattern) {
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