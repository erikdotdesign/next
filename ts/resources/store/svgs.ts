import { exportWholeAsset } from './index';

const getOddShapePathSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.AppAsset[] = []): srm.AppAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        getOddShapePathSVGs(page, (<srm.Group>layer).layers, sketch, svgs);
      } else if (layer.type === 'ShapePath') {
        const hasOpenPath: boolean = !(<srm.ShapePath>layer).closed;
        const notRectangle: boolean = (<srm.ShapePath>layer).shapeType !== 'Rectangle';
        const notOval: boolean = (<srm.ShapePath>layer).shapeType !== 'Oval';
        const isOddShape: boolean = notRectangle && notOval;
        if (hasOpenPath || isOddShape) {
          const svg = exportWholeAsset(page, layer, layer.id, 'svg', sketch);
          svgs.push(svg);
        }
      }
    });
  }
  return svgs;
};

const getShapeSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.AppAsset[] = []): srm.AppAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        getShapeSVGs(page, (<srm.Group>layer).layers, sketch, svgs);
      } else if (layer.type === 'Shape') {
        const svg = exportWholeAsset(page, layer, layer.id, 'svg', sketch);
        svgs.push(svg);
      }
    });
  }
  return svgs;
};

const getSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch) => {
  let shapeSvgs: srm.AppAsset[] = getShapeSVGs(page, layers, sketch);
  let oddShapePathSvgs: srm.AppAsset[] = getOddShapePathSVGs(page, layers, sketch);
  return [...shapeSvgs, ...oddShapePathSvgs];
};

export default getSVGs;