import * as styles from './layerStyles';
import shapeStyles from './shapeStyles';
import { styleReducer } from '../utils';

const shapePathStyles = (layer: srm.ShapePath, images: srm.Base64Image[]) => {
  const { style, shapeType, points } = layer;
  // get shape path and type
  const hasOpenPath = !layer.closed;
  const notRectangle = layer.shapeType !== 'Rectangle';
  const notOval = layer.shapeType !== 'Oval';
  const isOddShape = notRectangle && notOval;
  // get styles
  const baseStyles = styles.createBaseLayerStyles(layer);
  const background = styles.createBackground(layer, images);
  const borderRadius = styles.createBorderRadius(shapeType, points);
  const borders = styles.createBorders(style.borders);
  const shadows = styles.createShadows(style.shadows);
  const innerShadows = styles.createInnerShadows(style.innerShadows);
  const boxShadow = styles.combineBordersAndShadows([borders, shadows, innerShadows]);

  const combined = [
    baseStyles,
    background,
    borderRadius,
    boxShadow
  ];

  // if shape is open or odd, it will be an svg with shape styles
  // else it will be a div with full styles
  if (hasOpenPath || isOddShape) {
    return {...shapeStyles(layer)};
  } else {
    return styleReducer(combined);
  }
};

export default shapePathStyles;