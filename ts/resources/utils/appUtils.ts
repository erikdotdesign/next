import { Frame } from './appTypes';

export const getOrigin = (frame: Frame) => {
  const { x, y, width, height } = frame;
  return {
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    center: (y + height / 2) + (x + width / 2)
  }
}

export const between = (number: number, a: number, b: number) => {
  let min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
  return number >= min && number <= max;
};

export const placeLeft = (selectionOriginLeft: number, artboardWidth: number) => {
  if (selectionOriginLeft > artboardWidth / 2) {
    return true;
  } else {
    return false;
  }
}

export const placeTop = (selectionOriginTop: number, artboardHeight: number) => {
  if (selectionOriginTop > artboardHeight / 2) {
    return true;
  } else {
    return false;
  }
}