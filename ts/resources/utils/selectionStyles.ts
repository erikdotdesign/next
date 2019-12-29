import { Origin, Frame } from './appTypes';
import { placeLeft, placeTop } from './appUtils';
import { createPosition, createWidth, createHeight, createBorder } from './layerStyles';

export const createSelectionStyles = (selectionFrame: Frame) => {
  const position = createPosition(selectionFrame.x, selectionFrame.y);
  const width = createWidth(selectionFrame.width);
  const height = createHeight(selectionFrame.height);
  const border = createBorder({thickness: 1, color: 'rgba(0,0,0,0.25)', position: 'Outside'});

  return {
    ...position,
    ...width,
    ...height,
    ...border
  }
}

export const createRuleTopStyles = (selectionOrigin: Origin, hoverOrigin: Origin, inset: boolean) => {
  const height = selectionOrigin.top <= hoverOrigin.bottom
                  ? selectionOrigin.top - hoverOrigin.top
                  : selectionOrigin.top - hoverOrigin.bottom;
  const top = inset ? 0 : -height;
  return {
    height: `${height}px`,
    top: `${top}px`
  }
}

export const createRuleRightStyles = (selectionOrigin: Origin, hoverOrigin: Origin, inset: boolean) => {
  const width = selectionOrigin.right >= hoverOrigin.left
                ? hoverOrigin.right - selectionOrigin.right
                : hoverOrigin.left - selectionOrigin.right;
  const right = inset ? 0 : -width;
  return {
    width: `${width}px`,
    right: `${right}px`
  }
}

export const createRuleBottomStyles = (selectionOrigin: Origin, hoverOrigin: Origin, inset: boolean) => {
  const height = selectionOrigin.bottom >= hoverOrigin.top
                  ? hoverOrigin.bottom - selectionOrigin.bottom
                  : hoverOrigin.top - selectionOrigin.bottom;
  const bottom = inset ? 0 : -height;
  return {
    height: `${height}px`,
    bottom: `${bottom}px`
  }
}

export const createRuleLeftStyles = (selectionOrigin: Origin, hoverOrigin: Origin, inset: boolean) => {
  const width = selectionOrigin.left <= hoverOrigin.right
                ? selectionOrigin.left - hoverOrigin.left
                : selectionOrigin.left - hoverOrigin.right;
  const left = inset ? 0 : -width;
  return {
    width: `${width}px`,
    left: `${left}px`
  }
}

export const createDimTopBottomStyles = (selectionOrigin: Origin, artboardFrame: Frame) => {
  if (placeLeft(selectionOrigin.left, artboardFrame.width)) {
    return {
      right: '10px'
    }
  } else {
    return {
      left: '10px'
    }
  }
}

export const createDimRightLeftStyles = (selectionOrigin: Origin, artboardFrame: Frame) => {
  if (placeTop(selectionOrigin.top, artboardFrame.height)) {
    return {
      bottom: '10px'
    }
  } else {
    return {
      top: '10px'
    }
  }
}