import { getAbsolutePosition } from '../utils';
import { createLeft, createTop, createWidth, createHeight } from './layerStyles';

export const groupSelectionStyles = (groupSelection: srm.AppLayer, artboard: srm.Artboard, zoom:number) => {
  const absolutePosition = getAbsolutePosition(artboard.id, groupSelection.id);
  const width = createWidth(groupSelection.frame.width);
  const height = createHeight(groupSelection.frame.height);
  const top = createTop(absolutePosition.y);
  const left = createLeft(absolutePosition.x);
  //const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;

  return {
    ...width,
    ...height,
    ...top,
    ...left
   // boxShadow: `0 0 0 ${borderWidth}px rgba(0,0,0,0.25) inset, 0 0 0 ${borderWidth}px rgba(0,0,0,0.25)`
  }
}

export default groupSelectionStyles;