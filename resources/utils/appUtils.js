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
export const getDimScale = (zoom) => {
    switch (zoom) {
        case 2:
            return parseFloat((3 - zoom).toFixed(1));
        case 0.1:
        case 1.9:
            return parseFloat((2.9 - zoom).toFixed(1));
        case 0.2:
        case 1.8:
            return parseFloat((2.8 - zoom).toFixed(1));
        case 0.3:
        case 1.7:
            return parseFloat((2.7 - zoom).toFixed(1));
        case 0.4:
        case 1.6:
            return parseFloat((2.6 - zoom).toFixed(1));
        case 0.5:
        case 1.5:
            return parseFloat((2.5 - zoom).toFixed(1));
        case 0.6:
        case 1.4:
            return parseFloat((2.4 - zoom).toFixed(1));
        case 0.7:
        case 1.3:
            return parseFloat((2.3 - zoom).toFixed(1));
        case 0.8:
        case 1.2:
            return parseFloat((2.2 - zoom).toFixed(1));
        case 0.9:
        case 1.1:
            return parseFloat((2.1 - zoom).toFixed(1));
        case 1:
        default:
            return 1;
    }
};
export const getDimOrigin = (zoom) => {
    switch (zoom) {
        case 0.1:
            return parseFloat((1.9 - 0.5).toFixed(1));
        case 0.2:
            return parseFloat((1.8 - 0.5).toFixed(1));
        case 0.3:
            return parseFloat((1.7 - 0.5).toFixed(1));
        case 0.4:
            return parseFloat((1.6 - 0.5).toFixed(1));
        case 0.5:
            return parseFloat((1.5 - 0.5).toFixed(1));
        case 0.6:
            return parseFloat((1.4 - 0.5).toFixed(1));
        case 0.7:
            return parseFloat((1.3 - 0.5).toFixed(1));
        case 0.8:
            return parseFloat((1.2 - 0.5).toFixed(1));
        case 0.9:
            return parseFloat((1.1 - 0.5).toFixed(1));
        default:
            return 0.5;
    }
};
export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
export const throttle = (func, timeout) => {
    let exexute = true;
    //@ts-ignore
    return (...args) => {
        if (!exexute) {
            return;
        }
        exexute = false;
        func(...args);
        setTimeout(() => {
            exexute = true;
        }, timeout);
    };
};
