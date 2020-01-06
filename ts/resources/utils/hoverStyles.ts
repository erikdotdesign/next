import { placeLeft, placeTop } from './appUtils';
import { createLeft, createTop, createWidth, createHeight } from './layerStyles';

export const createHoveredStyles = (hoverFrame: srm.Rectangle) => {
  const width = createWidth(hoverFrame.width);
  const height = createHeight(hoverFrame.height);
  const top = createTop(hoverFrame.y);
  const left = createLeft(hoverFrame.x);

  return {
    ...width,
    ...height,
    ...top,
    ...left
  }
}

export const createRuleTopStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin) => {
  const height = hoverOrigin.top - selectionOrigin.top;
  return {
    height: `${height}px`,
    top: `-${height}px`
  }
}

export const createRuleRightStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin) => {
  const width = selectionOrigin.right - hoverOrigin.right;
  return {
    width: `${width}px`,
    right: `-${width}px`
  }
}

export const createRuleBottomStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin) => {
  const height = selectionOrigin.bottom - hoverOrigin.bottom;
  return {
    height: `${height}px`,
    bottom: `-${height}px`
  }
}

export const createRuleLeftStyles = (hoverOrigin: srm.Origin, selectionOrigin: srm.Origin) => {
  const width = hoverOrigin.left - selectionOrigin.left;
  return {
    width: `${width}px`,
    left: `-${width}px`
  }
}

export const createDimWidthStyles = (hoverFrame: srm.Rectangle, artboardFrame: srm.Rectangle) => {
  if (placeTop(hoverFrame.y, artboardFrame.height)) {
    return {
      left: '50%',
      top: 0,
      transform: `translateY(calc(-100% - 10px)) translateX(-50%)`
    }
  } else {
    return {
      left: '50%',
      bottom: 0,
      transform: `translateY(calc(100% + 10px)) translateX(-50%)`
    }
  }
}

export const createDimHeightStyles = (hoverFrame: srm.Rectangle, artboardFrame: srm.Rectangle) => {
  if (placeLeft(hoverFrame.x, artboardFrame.width)) {
    return {
      top: '50%',
      left: 0,
      transform: `translateX(calc(-100% - 10px)) translateY(-50%)`
    }
  } else {
    return {
      top: '50%',
      right: 0,
      transform: `translateX(calc(100% + 10px)) translateY(-50%)`
    }
  }
}