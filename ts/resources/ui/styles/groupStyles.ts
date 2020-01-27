import * as styles from './layerStyles';
const groupStyles = (layer: srm.Group) => {
  const baseStyles = styles.createBaseLayerStyles(layer);

  const isMask = layer.name === 'srm.mask';
  const overflow = isMask ? { overflow: 'hidden' } : { overflow: 'visible' };

  return {
    ...baseStyles,
    ...overflow
  };
};

export default groupStyles;