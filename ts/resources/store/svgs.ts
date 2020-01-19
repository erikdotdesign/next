import { getFileContent } from '../export';

const getOddShapePathSVGs = (layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.SvgPath[] = []): srm.SvgPath[] => {
  layers.forEach((layer: srm.SketchLayer) => {
    if (layer.type === 'ShapePath') {
      const hasOpenPath: boolean = !(<srm.ShapePath>layer).closed;
      const notRectangle: boolean = (<srm.ShapePath>layer).shapeType !== 'Rectangle';
      const notOval: boolean = (<srm.ShapePath>layer).shapeType !== 'Oval';
      const isOddShape: boolean = notRectangle && notOval;
      if (hasOpenPath || isOddShape) {
        // create svg in temp directory
        sketch.export(layer, {
          formats: 'svg',
          // @ts-ignore
          output: NSTemporaryDirectory(),
          ['use-id-for-name']: true,
          compact: true,
          overwriting: true
        });
        // get new svg path
        // @ts-ignore
        const filePath = `${NSTemporaryDirectory()}${layer.id}.svg`;
        // read contents of svg
        const svgContent = getFileContent(filePath);
        // set contents in svgs
        svgs.push({
          id: layer.id,
          svg: `${svgContent}`
        });
      }
    }
  });
  return svgs;
};

const getShapeSVGs = (layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.SvgPath[] = []): srm.SvgPath[] => {
  layers.forEach((layer: srm.SketchLayer) => {
    if (layer.type === 'Shape') {
      // create svg in temp directory
      sketch.export(layer, {
        formats: 'svg',
        // @ts-ignore
        output: NSTemporaryDirectory(),
        ['use-id-for-name']: true,
        compact: true,
        overwriting: true
      });
      // get new svg path
      // @ts-ignore
      const filePath = `${NSTemporaryDirectory()}${layer.id}.svg`;
      // read contents of svg
      const svgContent = getFileContent(filePath);
      // set contents in svgs
      svgs.push({
        id: layer.id,
        svg: `${svgContent}`
      });
    }
  });
  return svgs;
};

const getSVGs = (layers: srm.SketchLayer[], sketch: srm.Sketch) => {
  let shapeSvgs: srm.SvgPath[] = getShapeSVGs(layers, sketch);
  let oddShapePathSvgs: srm.SvgPath[] = getOddShapePathSVGs(layers, sketch);
  return [...shapeSvgs, ...oddShapePathSvgs];
};

export default getSVGs;