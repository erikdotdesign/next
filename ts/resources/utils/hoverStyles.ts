import { Frame, Origin } from './appTypes';
import { placeLeft, placeTop } from './appUtils';
import { createPosition, createWidth, createHeight, createBorder } from './layerStyles';

export const createHoveredStyles = (hoverFrame: Frame) => {
  const position = createPosition(hoverFrame.x, hoverFrame.y);
  const width = createWidth(hoverFrame.width);
  const height = createHeight(hoverFrame.height);
  const border = createBorder({thickness: 1, color: 'blue', position: 'Outside'});

  return {
    ...position,
    ...width,
    ...height,
    ...border
  }
}

export const createRuleTopStyles = (hoverOrigin: Origin, selectionOrigin: Origin) => {
  const height = hoverOrigin.top - selectionOrigin.top;
  return {
    height: `${height}px`,
    top: `-${height}px`
  }
}

export const createRuleRightStyles = (hoverOrigin: Origin, selectionOrigin: Origin) => {
  const width = selectionOrigin.right - hoverOrigin.right;
  return {
    width: `${width}px`,
    right: `-${width}px`
  }
}

export const createRuleBottomStyles = (hoverOrigin: Origin, selectionOrigin: Origin) => {
  const height = selectionOrigin.bottom - hoverOrigin.bottom;
  return {
    height: `${height}px`,
    bottom: `-${height}px`
  }
}

export const createRuleLeftStyles = (hoverOrigin: Origin, selectionOrigin: Origin) => {
  const width = hoverOrigin.left - selectionOrigin.left;
  return {
    width: `${width}px`,
    left: `-${width}px`
  }
}

export const createDimWidthStyles = (hoverFrame: Frame, artboardFrame: Frame) => {
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

export const createDimHeightStyles = (hoverFrame: Frame, artboardFrame: Frame) => {
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