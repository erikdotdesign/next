export const getOrigin = (frame: srm.Rectangle) => {
  const { x, y, width, height } = frame;
  return {
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    yCenter: y + height / 2,
    xCenter: x + width / 2
  }
};

export const placeLeft = (selectionOriginLeft: number, artboardWidth: number) => {
  if (selectionOriginLeft > artboardWidth / 2) {
    return true;
  } else {
    return false;
  }
};

export const placeTop = (selectionOriginTop: number, artboardHeight: number) => {
  if (selectionOriginTop > artboardHeight / 2) {
    return true;
  } else {
    return false;
  }
};