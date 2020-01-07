import { placeLeft, placeTop, getDimScale, getDimOrigin } from './appUtils';
import { createLeft, createTop, createWidth, createHeight } from './layerStyles';
export const createSelectionStyles = (selectionFrame) => {
    const width = createWidth(selectionFrame.width);
    const height = createHeight(selectionFrame.height);
    const top = createTop(selectionFrame.y);
    const left = createLeft(selectionFrame.x);
    return Object.assign(Object.assign(Object.assign(Object.assign({}, width), height), top), left);
};
export const createRuleTopStyles = (selectionOrigin, hoverOrigin, inset) => {
    const height = selectionOrigin.top <= hoverOrigin.bottom
        ? selectionOrigin.top - hoverOrigin.top
        : selectionOrigin.top - hoverOrigin.bottom;
    const top = inset ? 0 : -height;
    return {
        height: `${height}px`,
        top: `${top}px`
    };
};
export const createRuleRightStyles = (selectionOrigin, hoverOrigin, inset) => {
    const width = selectionOrigin.right >= hoverOrigin.left
        ? hoverOrigin.right - selectionOrigin.right
        : hoverOrigin.left - selectionOrigin.right;
    const right = inset ? 0 : -width;
    return {
        width: `${width}px`,
        right: `${right}px`
    };
};
export const createRuleBottomStyles = (selectionOrigin, hoverOrigin, inset) => {
    const height = selectionOrigin.bottom >= hoverOrigin.top
        ? hoverOrigin.bottom - selectionOrigin.bottom
        : hoverOrigin.top - selectionOrigin.bottom;
    const bottom = inset ? 0 : -height;
    return {
        height: `${height}px`,
        bottom: `${bottom}px`
    };
};
export const createRuleLeftStyles = (selectionOrigin, hoverOrigin, inset) => {
    const width = selectionOrigin.left <= hoverOrigin.right
        ? selectionOrigin.left - hoverOrigin.left
        : selectionOrigin.left - hoverOrigin.right;
    const left = inset ? 0 : -width;
    return {
        width: `${width}px`,
        left: `${left}px`
    };
};
export const createDimRightLeftStyles = (selectionOrigin, artboardFrame, zoom) => {
    const scale = getDimScale(zoom);
    const origin = Math.round(getDimOrigin(zoom) * 100);
    const translate = Math.round(100 - origin) * -1;
    if (placeTop(selectionOrigin.top, artboardFrame.height)) {
        // displays above rule
        return {
            bottom: '10px',
            left: '50%',
            transformOrigin: `${origin}% bottom`,
            transform: `scale(${scale}) translateX(${translate}%)`
        };
    }
    else {
        // displays below rule
        return {
            top: '10px',
            left: '50%',
            transformOrigin: `${origin}% top`,
            transform: `scale(${scale}) translateX(${translate}%)`
        };
    }
};
export const createDimTopBottomStyles = (selectionOrigin, artboardFrame, zoom) => {
    const scale = getDimScale(zoom);
    const origin = Math.round(getDimOrigin(zoom) * 100);
    const translate = Math.round(100 - origin) * -1;
    if (placeLeft(selectionOrigin.left, artboardFrame.width)) {
        // displays left of rule
        return {
            top: '50%',
            right: '10px',
            transformOrigin: `right ${origin}%`,
            transform: `scale(${scale}) translateY(${translate}%)`
        };
    }
    else {
        // displays right of rule
        return {
            top: '50%',
            left: '10px',
            transformOrigin: `left ${origin}%`,
            transform: `scale(${scale}) translateY(${translate}%)`
        };
    }
};
