import * as styles from './layerStyles';
import { styleReducer, getSVG } from '../utils';

const groupStyles = (layer: next.Group, svgs: next.SvgAsset[]) => {
  const baseStyles = styles.createBaseLayerStyles(layer);

  const isMask: boolean = layer.name === 'next.mask';
  const maskLayer: next.SketchLayer = layer.layers[0];
  const isMaskShapePath: boolean = maskLayer.type === 'ShapePath';
  const isMaskShape: boolean = maskLayer.type === 'Shape';
  const maskNotRectangle: boolean = isMaskShapePath && (<next.ShapePath>maskLayer).shapeType !== 'Rectangle';
  const maskNotOval: boolean = isMaskShapePath && (<next.ShapePath>maskLayer).shapeType !== 'Oval';
  const isMaskOddShape: boolean = maskNotRectangle && maskNotOval || isMaskShape;
  const oddShapeMaskSvg: next.SvgAsset | null | undefined = isMaskOddShape ? getSVG(svgs, maskLayer.id) : null;
  const borderRadius: next.css.BorderRadius | null = isMask && isMaskShapePath ? styles.createBorderRadius((maskLayer as next.ShapePath).shapeType, (maskLayer as next.ShapePath).points) : null;
  const overflow: next.css.Overflow | null = isMask ? styles.createOverflow('hidden') : null;
  const mask: next.css.Mask | null = isMask && isMaskOddShape && oddShapeMaskSvg ? styles.createMask(oddShapeMaskSvg.src) : null;

  const combined = [
    baseStyles,
    borderRadius,
    overflow,
    mask
  ];

  return styleReducer(combined);
};

export default groupStyles;