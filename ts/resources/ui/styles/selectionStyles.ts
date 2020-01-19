import { placeLeft, placeTop } from '../utils';
import { createLeft, createTop, createWidth, createHeight } from './layerStyles';

export const createSelectionStyles = (selectionFrame: srm.Rectangle, zoom:number) => {
  const width = createWidth(selectionFrame.width);
  const height = createHeight(selectionFrame.height);
  const top = createTop(selectionFrame.y);
  const left = createLeft(selectionFrame.x);
  const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;

  return {
    ...width,
    ...height,
    ...top,
    ...left,
    boxShadow: `0 0 0 ${borderWidth}px rgba(0,0,0,0.25) inset, 0 0 0 ${borderWidth}px rgba(0,0,0,0.25)`
  }
}

export const createRuleTopStyles = (selectionOrigin: srm.Origin, hoverOrigin: srm.Origin, inset: boolean, zoom: number) => {
  const height = selectionOrigin.top <= hoverOrigin.bottom
                  ? selectionOrigin.top - hoverOrigin.top
                  : selectionOrigin.top - hoverOrigin.bottom;
  const top = inset ? 0 : -height;
  const width = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    height: `${height}px`,
    top: `${top}px`,
    width: `${width}px`
  }
}

export const createRuleRightStyles = (selectionOrigin: srm.Origin, hoverOrigin: srm.Origin, inset: boolean, zoom: number) => {
  const width = selectionOrigin.right >= hoverOrigin.left
                ? hoverOrigin.right - selectionOrigin.right
                : hoverOrigin.left - selectionOrigin.right;
  const right = inset ? 0 : -width;
  const height = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    width: `${width}px`,
    right: `${right}px`,
    height: `${height}px`
  }
}

export const createRuleBottomStyles = (selectionOrigin: srm.Origin, hoverOrigin: srm.Origin, inset: boolean, zoom: number) => {
  const height = selectionOrigin.bottom >= hoverOrigin.top
                  ? hoverOrigin.bottom - selectionOrigin.bottom
                  : hoverOrigin.top - selectionOrigin.bottom;
  const bottom = inset ? 0 : -height;
  const width = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    height: `${height}px`,
    bottom: `${bottom}px`,
    width: `${width}px`
  }
}

export const createRuleLeftStyles = (selectionOrigin: srm.Origin, hoverOrigin: srm.Origin, inset: boolean, zoom: number) => {
  const width = selectionOrigin.left <= hoverOrigin.right
                ? selectionOrigin.left - hoverOrigin.left
                : selectionOrigin.left - hoverOrigin.right;
  const left = inset ? 0 : -width;
  const height = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    width: `${width}px`,
    left: `${left}px`,
    height: `${height}px`
  }
}

export const createDimRightLeftStyles = (selectionOrigin: srm.Origin, artboardFrame: srm.Rectangle, zoom: number) => {
  const scale = zoom < 1 ? 1 / zoom : 1;
  const origin = zoom < 1 ? 50 / zoom : 50;
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

export const createDimTopBottomStyles = (selectionOrigin: srm.Origin, artboardFrame: srm.Rectangle, zoom: number) => {
  const scale = zoom < 1 ? 1 / zoom : 1;
  const origin = zoom < 1 ? 50 / zoom : 50;
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