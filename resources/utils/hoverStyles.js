import { createPosition, createWidth, createHeight, createBorder } from './layerStyles';
export const createHoveredStyles = (layer) => {
    const { frame } = layer;
    const position = createPosition(frame.x, frame.y);
    const width = createWidth(frame.width);
    const height = createHeight(frame.height);
    const border = createBorder({ thickness: 1, color: 'blue', position: 'Outside' });
    return Object.assign(Object.assign(Object.assign(Object.assign({}, position), width), height), border);
};
export const createDimWidthStyles = (layer, artboard) => {
    //const borderOffset = getBorderOffset(layer);
    const layerOriginY = layer.frame.y + layer.frame.height / 2;
    if (layerOriginY > artboard.frame.height / 2) {
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
export const createDimHeightStyles = (layer, artboard) => {
    //const borderOffset = getBorderOffset(layer);
    const layerOriginX = layer.frame.x + layer.frame.width / 2;
    if (layerOriginX > artboard.frame.width / 2) {
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
