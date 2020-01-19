import * as styles from './layerStyles';
import {styleReducer } from '../utils';

const shapeStyles = (layer: srm.Shape | srm.ShapePath) => {
  const { frame } = layer;
  // generate styles
  const width = styles.createWidth(frame.width);
  const height = styles.createHeight(frame.height);
  const top = styles.createTop(frame.y);
  const left = styles.createLeft(frame.x);
  // combine styles
  const combined = [
    width,
    height,
    top,
    left
  ];
  // return final style object
  return styleReducer(combined);
};

export default shapeStyles;