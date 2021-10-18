import * as styles from './layerStyles';
import { styleReducer } from '../utils';

const shapePathStyles = (layer: next.ShapePath, images: next.ImgAsset[]) => {
  const { style, shapeType, points } = layer;
  // generate styles
  const baseStyles = styles.createBaseLayerStyles(layer);
  const background = styles.createBackground(layer, images);
  const borderRadius = styles.createBorderRadius(shapeType, points);
  const borders = styles.createBorders(style.borders);
  const shadows = styles.createShadows(style.shadows);
  const innerShadows = styles.createInnerShadows(style.innerShadows);
  const boxShadow = styles.combineBordersAndShadows([borders, shadows, innerShadows]);
  // combine styles
  const combined = [
    baseStyles,
    background,
    borderRadius,
    boxShadow
  ];
  // return final style object
  return styleReducer(combined);
};

export default shapePathStyles;