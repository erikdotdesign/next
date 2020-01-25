import { getAbsolutePosition } from '../utils';
import { createLeft, createTop, createWidth, createHeight, createColorFill } from './layerStyles';

export const groupSelectionStyles = (groupSelection: srm.AppLayer, artboard: srm.Artboard, zoom:number) => {
  const absolutePosition = getAbsolutePosition(artboard.id, groupSelection.id);
  const width = createWidth(groupSelection.frame.width);
  const height = createHeight(groupSelection.frame.height);
  const top = createTop(absolutePosition.y);
  const left = createLeft(absolutePosition.x);

  return {
    ...width,
    ...height,
    ...top,
    ...left
  }
}

export const groupSelectionScrimStyles = (artboard: srm.Artboard) => {
  const { background } = artboard;
  const { color, enabled } = background;
  const bg = enabled ? createColorFill(color) : { background: '#111' };
  const opacity = { opacity: 0.8 };

  return {
    ...bg,
    ...opacity
  }
}

export default groupSelectionStyles;