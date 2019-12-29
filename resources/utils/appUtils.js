export const getOrigin = (frame) => {
    const { x, y, width, height } = frame;
    return {
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        center: (y + height / 2) + (x + width / 2),
        yCenter: y + height / 2,
        xCenter: x + width / 2
    };
};
export const between = (number, a, b) => {
    let min = Math.min.apply(Math, [a, b]), max = Math.max.apply(Math, [a, b]);
    return number >= min && number <= max;
};
export const placeLeft = (selectionOriginLeft, artboardWidth) => {
    if (selectionOriginLeft > artboardWidth / 2) {
        return true;
    }
    else {
        return false;
    }
};
export const placeTop = (selectionOriginTop, artboardHeight) => {
    if (selectionOriginTop > artboardHeight / 2) {
        return true;
    }
    else {
        return false;
    }
};
