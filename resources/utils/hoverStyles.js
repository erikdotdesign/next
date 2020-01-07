import { placeLeft, placeTop, getDimScale, getDimOrigin } from './appUtils';
import { createLeft, createTop, createWidth, createHeight } from './layerStyles';
export const createHoveredStyles = (hoverFrame) => {
    const width = createWidth(hoverFrame.width);
    const height = createHeight(hoverFrame.height);
    const top = createTop(hoverFrame.y);
    const left = createLeft(hoverFrame.x);
    return Object.assign(Object.assign(Object.assign(Object.assign({}, width), height), top), left);
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
export const createDimWidthStyles = (hoverFrame, artboardFrame, zoom) => {
    const scale = getDimScale(zoom);
    const origin = Math.round(getDimOrigin(zoom) * 100);
    const translate = Math.round(100 - origin) * -1;
    if (placeTop(hoverFrame.y, artboardFrame.height)) {
        // displays on top of element
        return {
            left: '50%',
            bottom: 'calc(100% + 10px)',
            transformOrigin: `${origin}% bottom`,
            transform: `scale(${scale}) translateX(${translate}%)`
        };
    }
    else {
        // displays on bottom of element
        return {
            left: '50%',
            top: 'calc(100% + 10px)',
            transformOrigin: `${origin}% top`,
            transform: `scale(${scale}) translateX(${translate}%)`
        };
    }
};
export const createDimHeightStyles = (hoverFrame, artboardFrame, zoom) => {
    const scale = getDimScale(zoom);
    const origin = Math.round(getDimOrigin(zoom) * 100);
    const translate = Math.round(100 - origin) * -1;
    if (placeLeft(hoverFrame.x, artboardFrame.width)) {
        // displays on left of element
        return {
            top: '50%',
            right: 'calc(100% + 10px)',
            transformOrigin: `right ${origin}%`,
            transform: `scale(${scale}) translateY(${translate}%)`
        };
    }
    else {
        // displays on right of element
        return {
            top: '50%',
            left: 'calc(100% + 10px)',
            transformOrigin: `left ${origin}%`,
            transform: `scale(${scale}) translateY(${translate}%)`
        };
    }
};
