const layerToSVG = (page: srm.Page, layer: srm.Shape | srm.ShapePath | srm.Group, sketch: srm.Sketch, id?: string): srm.SvgAsset => {
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
  // opacity and transforms will be applied on the div, not svg
  layerDuplicate.style.opacity = 1;
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
    id: id ? id : layer.id,
    // @ts-ignore
    src: `${NSTemporaryDirectory()}${layerDuplicate.id}.svg`
  }
};

const layerToShape = (layer: srm.Group | srm.ShapePath, sketch: srm.Sketch, name?: string) => {
  // create new shape
  const shapeReplacement = new sketch.Shape({
    name: name ? name : layer.name,
    frame: layer.frame,
    style: layer.style,
    transform: {
      rotation: layer.transform.rotation,
      flippedHorizontally: layer.transform.flippedHorizontally,
      flippedVertically: layer.transform.flippedVertically
    }
  });
  // return new shape
  return shapeReplacement;
};

const groupToShape = (layer: srm.Group, sketch: srm.Sketch, prefix: string) => {
  // remove prefix from name
  const newName = layer.name.substr(prefix.length, layer.name.length - prefix.length).trim();
  // create new shape
  const shapeReplacement = layerToShape(layer, sketch, newName);
  // return new shape
  return shapeReplacement;
};

const createTempSVGs = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, svgs: srm.SvgAsset[] = []): srm.SvgAsset[] => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer, index: number) => {
      if (layer.type === 'Group') {
        if (layer.name.startsWith('[srm.svg]')) {
          // create shape to replace group
          const newShape = groupToShape(layer as srm.Group, sketch, '[srm.svg]');
          // create svg from group
          const svg = layerToSVG(page, layer as srm.Group, sketch, newShape.id);
          svgs.push(svg);
          // splice in new shape, splice out group
          layers.splice(index, 1, newShape);
        } else {
          createTempSVGs(page, (<srm.Group>layer).layers, sketch, svgs);
        }
      } else if (layer.type === 'Shape') {
        const svg = layerToSVG(page, layer as srm.Shape, sketch);
        svgs.push(svg);
      } else if (layer.type === 'ShapePath') {
        const hasOpenPath: boolean = !(<srm.ShapePath>layer).closed;
        const notRectangle: boolean = (<srm.ShapePath>layer).shapeType !== 'Rectangle';
        const notOval: boolean = (<srm.ShapePath>layer).shapeType !== 'Oval';
        const isOddShape: boolean = notRectangle && notOval;
        const hasDashPattern: boolean = (<srm.ShapePath>layer).style.borderOptions.dashPattern.length > 0;
        if (hasOpenPath || isOddShape || hasDashPattern) {
          // turn complex shapePaths into shapes
          // makes things easier when it comes to styling the divs
          const shapeReplacement = layerToShape(layer as srm.ShapePath, sketch);
          const svg = layerToSVG(page, layer as srm.ShapePath, sketch, shapeReplacement.id);
          svgs.push(svg);
          layers.splice(index, 1, shapeReplacement);
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