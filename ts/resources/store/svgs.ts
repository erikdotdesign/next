import { getFileContent } from '../export';

const getOddShapePathSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.SvgPath[] = []): srm.SvgPath[] => {
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
          // create new artboard for svg export
          // this is a solution to remove any parent,
          // group styles applied to the shape when exported
          const shapeArtboard = new sketch.Artboard({
            name: `${layer.id}-shape-artboard`,
            frame: layer.frame,
            parent: page,
            layers: [layer.duplicate()]
          });
          // reset shape position on artboard
          let shapeDuplicate = shapeArtboard.layers[0];
          shapeDuplicate.frame.x = 0;
          shapeDuplicate.frame.y = 0;
          // create svg in temp directory
          sketch.export(shapeDuplicate, {
            formats: 'svg',
            // @ts-ignore
            output: NSTemporaryDirectory(),
            ['use-id-for-name']: true,
            compact: true,
            overwriting: true
          });
          // get new svg path
          // @ts-ignore
          const filePath = `${NSTemporaryDirectory()}${shapeDuplicate.id}.svg`;
          // read contents of svg
          const svgContent = getFileContent(filePath);
          // set contents in svgs
          svgs.push({
            id: layer.id,
            svg: `${svgContent}`
          });
          // remove shape artboard from page
          shapeArtboard.remove();
        }
      }
    });
  }
  return svgs;
};

const getShapeSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.SvgPath[] = []): srm.SvgPath[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        getShapeSVGs(page, (<srm.Group>layer).layers, sketch, svgs);
      } else if (layer.type === 'Shape') {
        // create new artboard for svg export
        // this is a solution to remove any parent,
        // group styles applied to the shape when exported
        const shapeArtboard = new sketch.Artboard({
          name: `${layer.id}-shape-artboard`,
          frame: layer.frame,
          parent: page,
          layers: [layer.duplicate()]
        });
        // reset shape position on artboard
        let shapeDuplicate = shapeArtboard.layers[0];
        shapeDuplicate.frame.x = 0;
        shapeDuplicate.frame.y = 0;
        // create svg in temp directory
        sketch.export(shapeDuplicate, {
          formats: 'svg',
          // @ts-ignore
          output: NSTemporaryDirectory(),
          ['use-id-for-name']: true,
          compact: true,
          overwriting: true
        });
        // get new svg path
        // @ts-ignore
        const filePath = `${NSTemporaryDirectory()}${shapeDuplicate.id}.svg`;
        // read contents of svg
        const svgContent = getFileContent(filePath);
        // set contents in svgs
        svgs.push({
          id: layer.id,
          svg: `${svgContent}`
        });
        // remove shape artboard from page
        shapeArtboard.remove();
      }
    });
  }
  return svgs;
};

const getSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch) => {
  let shapeSvgs: srm.SvgPath[] = getShapeSVGs(page, layers, sketch);
  let oddShapePathSvgs: srm.SvgPath[] = getOddShapePathSVGs(page, layers, sketch);
  return [...shapeSvgs, ...oddShapePathSvgs];
};

export default getSVGs;