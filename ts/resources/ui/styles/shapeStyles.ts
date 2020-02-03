import * as styles from './layerStyles';
import { styleReducer, getSVG } from '../utils';

const shapeStyles = (layer: srm.Shape | srm.ShapePath, svgs: any[]) => {
  const { frame } = layer;
  // generate styles
  const width = styles.createWidth(frame.width);
  const height = styles.createHeight(frame.height);
  const top = styles.createTop(frame.y);
  const left = styles.createLeft(frame.x);
  const svg = getSVG(svgs, layer.id);
  const transformRotation = styles.createRotation(layer.transform);
  const transformHFlip = styles.createHorizontalFlip(layer.transform);
  const transformVFlip = styles.createVerticalFlip(layer.transform);
  const transform = styles.createTransform([transformRotation, transformHFlip, transformVFlip]);
  const background = {
    background: `url(${svg ? svg.src : null})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${frame.width} ${frame.height}`,
    backgroundPosition: 'center center'
  }
  // combine styles
  const combined = [
    width,
    height,
    top,
    left,
    background,
    transform
  ];
  // return final style object
  return styleReducer(combined);
};

export default shapeStyles;