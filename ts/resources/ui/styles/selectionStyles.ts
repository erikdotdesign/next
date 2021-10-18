import { placeLeft, placeTop, getAbsolutePosition } from '../utils';
import { createLeft, createTop, createWidth, createHeight } from './layerStyles';

export const createSelectionStyles = (selection: next.AppLayer, artboard: next.Artboard, zoom:number) => {
  const absolutePosition = getAbsolutePosition(artboard.id, selection.id);
  const width = createWidth(selection.frame.width);
  const height = createHeight(selection.frame.height);
  const top = createTop(absolutePosition.y);
  const left = createLeft(absolutePosition.x);
  const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;

  return {
    ...width,
    ...height,
    ...top,
    ...left,
    boxShadow: `0 0 0 ${borderWidth}px rgba(0,0,0,0.25) inset, 0 0 0 ${borderWidth}px rgba(0,0,0,0.25)`
  }
}

export const createRuleTopStyles = (selectionOrigin: next.Origin, hoverOrigin: next.Origin, zoom: number, color: string) => {
  const height = selectionOrigin.top <= hoverOrigin.bottom
                  ? selectionOrigin.top - hoverOrigin.top
                  : selectionOrigin.top - hoverOrigin.bottom;
  const top = -height;
  const width = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    height: `${height}px`,
    top: `${top}px`,
    width: `${width}px`,
    background: color
  }
}

export const createRuleRightStyles = (selectionOrigin: next.Origin, hoverOrigin: next.Origin, zoom: number, color: string) => {
  const width = selectionOrigin.right >= hoverOrigin.left
                ? hoverOrigin.right - selectionOrigin.right
                : hoverOrigin.left - selectionOrigin.right;
  const right = -width;
  const height = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    width: `${width}px`,
    right: `${right}px`,
    height: `${height}px`,
    background: color
  }
}

export const createRuleBottomStyles = (selectionOrigin: next.Origin, hoverOrigin: next.Origin, zoom: number, color: string) => {
  const height = selectionOrigin.bottom >= hoverOrigin.top
                  ? hoverOrigin.bottom - selectionOrigin.bottom
                  : hoverOrigin.top - selectionOrigin.bottom;
  const bottom = -height;
  const width = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    height: `${height}px`,
    bottom: `${bottom}px`,
    width: `${width}px`,
    background: color
  }
}

export const createRuleLeftStyles = (selectionOrigin: next.Origin, hoverOrigin: next.Origin, zoom: number, color: string) => {
  const width = selectionOrigin.left <= hoverOrigin.right
                ? selectionOrigin.left - hoverOrigin.left
                : selectionOrigin.left - hoverOrigin.right;
  const left = -width;
  const height = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    width: `${width}px`,
    left: `${left}px`,
    height: `${height}px`,
    background: color
  }
}

export const createDimRightLeftStyles = (selectionOrigin: next.Origin, artboardFrame: next.Rectangle, zoom: number) => {
  const scale = 1 / zoom;
  const origin = 50 / zoom;
  const translate = (100 - origin) * -1;
  if (placeTop(selectionOrigin.top, artboardFrame.height)) {
    // displays above rule
    return {
      bottom: '10px',
      left: '50%',
      transformOrigin: `${origin}% bottom`,
      transform: `scale(${scale}) translateX(${translate}%)`
    }
  } else {
    // displays below rule
    return {
      top: '10px',
      left: '50%',
      transformOrigin: `${origin}% top`,
      transform: `scale(${scale}) translateX(${translate}%)`
    }
  }
}

export const createDimTopBottomStyles = (selectionOrigin: next.Origin, artboardFrame: next.Rectangle, zoom: number) => {
  const scale = 1 / zoom;
  const origin = 50 / zoom;
  const translate = (100 - origin) * -1;
  if (placeLeft(selectionOrigin.left, artboardFrame.width)) {
    // displays left of rule
    return {
      top: '50%',
      right: '10px',
      transformOrigin: `right ${origin}%`,
      transform: `scale(${scale}) translateY(${translate}%)`
    }
  } else {
    // displays right of rule
    return {
      top: '50%',
      left: '10px',
      transformOrigin: `left ${origin}%`,
      transform: `scale(${scale}) translateY(${translate}%)`
    }
  }
}