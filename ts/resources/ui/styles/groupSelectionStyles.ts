import { getAbsolutePosition } from '../utils';
import * as styles from './layerStyles';

export const groupSelectionStyles = (groupSelection: srm.AppArtboardLayer) => {
  const baseStyles = styles.createBaseLayerStyles(groupSelection);
  const top = styles.createTop(0);
  const left = styles.createLeft(0);

  return {
    ...baseStyles,
    ...top,
    ...left
  }
}

export const groupSelectionArtboardStyles = (groupSelection: srm.AppArtboardLayer, artboard: srm.Artboard) => {
  const { background } = artboard;
  const { color, enabled } = background;
  const absolutePosition = getAbsolutePosition(artboard.id, groupSelection.id);
  const width = styles.createWidth(groupSelection.frame.width);
  const height = styles.createHeight(groupSelection.frame.height);
  const top = styles.createTop(absolutePosition.y);
  const left = styles.createLeft(absolutePosition.x);
  const bg = enabled ? styles.createColorFill(color) : { background: '#fff' };

  return {
    ...width,
    ...height,
    ...top,
    ...left,
    ...bg
  }
}

export const groupSelectionScrimStyles = (artboard: srm.Artboard) => {
  const { background } = artboard;
  const { color, enabled } = background;
  const bg = enabled ? styles.createColorFill(color) : { background: '#111' };
  const opacity = { opacity: 0.8 };

  return {
    ...bg,
    ...opacity
  }
}

export default groupSelectionStyles;