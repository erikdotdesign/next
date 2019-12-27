import { createPosition, createWidth, createHeight, createBorder } from './layerStyles';

export const createSelectionStyles = (layer: any) => {
  const { frame } = layer;
  const position = createPosition(frame.x, frame.y);
  const width = createWidth(frame.width);
  const height = createHeight(frame.height);
  const border = createBorder({thickness: 1, color: 'rgba(0,0,0,0.25)', position: 'Outside'});

  return {
    ...position,
    ...width,
    ...height,
    ...border
  }
}

const placeLeft = (layer: any, artboard: any) => {
  const artboardCenter = artboard.frame.width / 2;
  const layerCenter = layer.frame.x + (layer.frame.width / 2);
  return layerCenter >= artboardCenter;
}

const placeTop = (layer: any, artboard: any) => {
  const artboardCenter = artboard.frame.height / 2;
  const layerCenter = layer.frame.y + (layer.frame.height / 2);
  return layerCenter >= artboardCenter;
}

export const createRuleTStyles = (selection: any, hover: any) => {
  const selectionTopOrigin = selection.frame.y;
  const hoverBottomOrigin = hover.frame.y + hover.frame.height;
  const belowSelection = selectionTopOrigin > hoverBottomOrigin;
  let height = belowSelection ? selection.frame.y - hoverBottomOrigin : selection.frame.y - hover.frame.y;
  return {
    height: `${height}px`,
    top: `-${height}px`
  }
}

export const createRuleTBDimStyles = (layer: any, artboard: any) => {
  if (placeLeft(layer, artboard)) {
    return {
      right: '10px'
    }
  } else {
    return {
      left: '10px'
    }
  }
}

export const createRuleRStyles = (selection: any, hover: any) => {
  const selectionRightOrigin = selection.frame.x + selection.frame.width;
  const hoverLeftOrigin = hover.frame.x;
  const hoverRightOrigin = hover.frame.x + hover.frame.width;
  const rightOfHoverLeft = selectionRightOrigin > hoverLeftOrigin;
  let width = rightOfHoverLeft ? hoverRightOrigin - selectionRightOrigin : hoverLeftOrigin - selectionRightOrigin;
  return {
    width: `${width}px`,
    right: `-${width}px`
  }
}

export const createRuleRLDimStyles = (layer: any, artboard: any) => {
  if (placeTop(layer, artboard)) {
    return {
      bottom: '10px'
    }
  } else {
    return {
      top: '10px'
    }
  }
}

export const createRuleBStyles = (selection: any, hover: any) => {
  const selectionBottomOrigin = selection.frame.y + selection.frame.height;
  const hoverTopOrigin = hover.frame.y;
  const hoverBottomOrigin = hover.frame.y + hover.frame.height;
  const belowHoverTop = selectionBottomOrigin > hoverTopOrigin;
  let height = belowHoverTop ? hoverBottomOrigin - selectionBottomOrigin : hoverTopOrigin - selectionBottomOrigin;
  return {
    height: `${height}px`,
    bottom: `-${height}px`
  }
}

export const createRuleLStyles = (selection: any, hover: any) => {
  const selectionLeftOrigin = selection.frame.x;
  const hoverLeftOrigin = hover.frame.x;
  const hoverRightOrigin = hover.frame.x + hover.frame.width;
  const leftOfHoverRight = selectionLeftOrigin > hoverRightOrigin;
  let width = leftOfHoverRight ? selectionLeftOrigin - hoverRightOrigin : selectionLeftOrigin - hoverLeftOrigin;
  return {
    width: `${width}px`,
    left: `-${width}px`
  }
}