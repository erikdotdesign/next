export const getOrigin = (frame) => {
    const { x, y, width, height } = frame;
    return {
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        yCenter: y + height / 2,
        xCenter: x + width / 2
    };
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
