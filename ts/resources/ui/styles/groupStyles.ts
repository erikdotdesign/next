import * as styles from './layerStyles';
import { styleReducer } from '../utils';

const groupStyles = (layer: srm.Group) => {
  const baseStyles = styles.createBaseLayerStyles(layer);

  const isMask = layer.name === 'srm.mask';
  const maskLayer = isMask ? layer.layers[0] : null;
  const isShapePath = maskLayer && maskLayer.type === 'ShapePath';
  const borderRadius = isShapePath ? styles.createBorderRadius((maskLayer as srm.ShapePath).shapeType, (maskLayer as srm.ShapePath).points) : null;
  const overflow = isMask ? { overflow: 'hidden' } : { overflow: 'visible' };

  const combined = [
    baseStyles,
    borderRadius,
    overflow
  ];

  return styleReducer(combined);
};

export default groupStyles;