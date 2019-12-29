import { placeLeft, placeTop } from './appUtils';
import { createPosition, createWidth, createHeight, createBorder } from './layerStyles';
export const createHoveredStyles = (hoverFrame) => {
    const position = createPosition(hoverFrame.x, hoverFrame.y);
    const width = createWidth(hoverFrame.width);
    const height = createHeight(hoverFrame.height);
    const border = createBorder({ thickness: 1, color: 'blue', position: 'Outside' });
    return Object.assign(Object.assign(Object.assign(Object.assign({}, position), width), height), border);
};
export const createRuleTopStyles = (hoverOrigin, selectionOrigin) => {
    const height = hoverOrigin.top - selectionOrigin.top;
    return {
        height: `${height}px`,
        top: `-${height}px`
    };
};
export const createRuleRightStyles = (hoverOrigin, selectionOrigin) => {
    const width = selectionOrigin.right - hoverOrigin.right;
    return {
        width: `${width}px`,
        right: `-${width}px`
    };
};
export const createRuleBottomStyles = (hoverOrigin, selectionOrigin) => {
    const height = selectionOrigin.bottom - hoverOrigin.bottom;
    return {
        height: `${height}px`,
        bottom: `-${height}px`
    };
};
export const createRuleLeftStyles = (hoverOrigin, selectionOrigin) => {
    const width = hoverOrigin.left - selectionOrigin.left;
    return {
        width: `${width}px`,
        left: `-${width}px`
    };
};
export const createDimWidthStyles = (hoverFrame, artboardFrame) => {
    if (placeTop(hoverFrame.y, artboardFrame.height)) {
        return {
            left: '50%',
            top: 0,
            transform: `translateY(calc(-100% - 10px)) translateX(-50%)`
        };
    }
    else {
        return {
            left: '50%',
            bottom: 0,
            transform: `translateY(calc(100% + 10px)) translateX(-50%)`
        };
    }
};
export const createDimHeightStyles = (hoverFrame, artboardFrame) => {
    if (placeLeft(hoverFrame.x, artboardFrame.width)) {
        return {
            top: '50%',
            left: 0,
            transform: `translateX(calc(-100% - 10px)) translateY(-50%)`
        };
    }
    else {
        return {
            top: '50%',
            right: 0,
            transform: `translateX(calc(100% + 10px)) translateY(-50%)`
        };
    }
};
