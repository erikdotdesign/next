import * as styles from './layerStyles';
import { styleReducer, getSVG } from '../utils';

const groupStyles = (layer: srm.Group, svgs: srm.SvgAsset[]) => {
  const baseStyles = styles.createBaseLayerStyles(layer);

  const isMask: boolean = layer.name === 'srm.mask';
  const maskLayer: srm.SketchLayer = layer.layers[0];
  const isShapePath: boolean = maskLayer.type === 'ShapePath';
  const maskNotRectangle: boolean = isShapePath && (<srm.ShapePath>maskLayer).shapeType !== 'Rectangle';
  const maskNotOval: boolean = isShapePath && (<srm.ShapePath>maskLayer).shapeType !== 'Oval';
  const isMaskOddShape: boolean = maskNotRectangle && maskNotOval || maskLayer.type === 'Shape';
  const oddShapeMaskSvg: srm.SvgAsset | null | undefined = isMaskOddShape ? getSVG(svgs, maskLayer.id) : null;
  const borderRadius: srm.css.BorderRadius | null = !isMaskOddShape ? styles.createBorderRadius((maskLayer as srm.ShapePath).shapeType, (maskLayer as srm.ShapePath).points) : null;
  const overflow = isMask ? { overflow: 'hidden' } : null;
  const maskSVG = isMaskOddShape ? { mask: `url(${oddShapeMaskSvg?.src})`, WebkitMaskBoxImage: `url(${oddShapeMaskSvg?.src}) 100 100 0 0 stretch stretch` } : null;

  const combined = [
    baseStyles,
    borderRadius,
    overflow,
    maskSVG
  ];

  return styleReducer(combined);
};

export default groupStyles;