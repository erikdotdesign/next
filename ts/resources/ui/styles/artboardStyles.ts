import * as styles from './layerStyles';

const artboardStyles = (artboard: srm.Artboard) => {
  const { frame, background } = artboard;
  const { color, enabled } = background;
  const width = styles.createWidth(frame.width);
  const height = styles.createHeight(frame.height);
  const bg = enabled ? styles.createColorFill(color) : { background: '#fff' };

  return {
    ...width,
    ...height,
    ...bg
  }
};

export default artboardStyles;