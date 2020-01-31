import { placeLeft, placeTop, getAbsolutePosition } from '../utils';
import { createLeft, createTop, createWidth, createHeight } from './layerStyles';

export const createHoveredStyles = (hover: srm.AppLayer, artboard: srm.Artboard, zoom: number, color: string) => {
  const absolutePosition = getAbsolutePosition(artboard.id, hover.id);
  const width = createWidth(hover.frame.width);
  const height = createHeight(hover.frame.height);
  const top = createTop(absolutePosition.y);
  const left = createLeft(absolutePosition.x);
  const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;

  return {
    ...width,
    ...height,
    ...top,
    ...left,
    boxShadow: `0 0 0 ${borderWidth}px ${color} inset, 0 0 0 ${borderWidth}px ${color}`
  }
}

export const createRuleTopStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin, zoom: number, color: string) => {
  const height = hoverOrigin.top - selectionOrigin.top;
  const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    height: `${height}px`,
    top: `-${height}px`,
    borderWidth: `${borderWidth}px`,
    borderColor: color
  }
}

export const createRuleRightStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin, zoom: number, color: string) => {
  const width = selectionOrigin.right - hoverOrigin.right;
  const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    width: `${width}px`,
    right: `-${width}px`,
    borderWidth: `${borderWidth}px`,
    borderColor: color
  }
}

export const createRuleBottomStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin, zoom: number, color: string) => {
  const height = selectionOrigin.bottom - hoverOrigin.bottom;
  const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    height: `${height}px`,
    bottom: `-${height}px`,
    borderWidth: `${borderWidth}px`,
    borderColor: color
  }
}

export const createRuleLeftStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin, zoom: number, color: string) => {
  const width = hoverOrigin.left - selectionOrigin.left;
  const borderWidth = zoom < 1 ? Math.round(1 / zoom) : 1;
  return {
    width: `${width}px`,
    left: `-${width}px`,
    borderWidth: `${borderWidth}px`,
    borderColor: color
  }
}

export const createDimWidthStyles = (hoverFrame: srm.Rectangle, artboardFrame: srm.Rectangle, zoom: number) => {
  const scale = zoom < 1 ? 1 / zoom : 1;
  const origin = zoom < 1 ? 50 / zoom : 50;
  const translate = (100 - origin) * -1;
  if (placeTop(hoverFrame.y, artboardFrame.height)) {
    // displays on top of element
    return {
      left: '50%',
      bottom: 'calc(100% + 10px)',
      transformOrigin: `${origin}% bottom`,
      transform: `scale(${scale}) translateX(${translate}%)`
    }
  } else {
    // displays on bottom of element
    return {
      left: '50%',
      top: 'calc(100% + 10px)',
      transformOrigin: `${origin}% top`,
      transform: `scale(${scale}) translateX(${translate}%)`
    }
  }
}

export const createDimHeightStyles = (hoverFrame: srm.Rectangle, artboardFrame: srm.Rectangle, zoom: number) => {
  const scale = zoom < 1 ? 1 / zoom : 1;
  const origin = zoom < 1 ? 50 / zoom : 50;
  const translate = (100 - origin) * -1;
  if (placeLeft(hoverFrame.x, artboardFrame.width)) {
    // displays on left of element
    return {
      top: '50%',
      right: 'calc(100% + 10px)',
      transformOrigin: `right ${origin}%`,
      transform: `scale(${scale}) translateY(${translate}%)`
    }
  } else {
    // displays on right of element
    return {
      top: '50%',
      left: 'calc(100% + 10px)',
      transformOrigin: `left ${origin}%`,
      transform: `scale(${scale}) translateY(${translate}%)`
    }
  }
}