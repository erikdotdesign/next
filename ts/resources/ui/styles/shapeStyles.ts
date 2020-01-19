import * as styles from './layerStyles';

const shapeStyles = (layer: srm.Shape | srm.ShapePath) => {
  const baseStyles = styles.createBaseLayerStyles(layer);

  return {
    ...baseStyles
  }
};

export default shapeStyles;