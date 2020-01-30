import React from 'react';
import LayerDim from './LayerDim';
import { createDimWidthStyles, createDimHeightStyles } from '../styles/hoverStyles';
const HoverDims = (props) => {
    const { hover, artboard, zoom } = props;
    return (React.createElement("div", null,
        React.createElement(LayerDim, { style: createDimWidthStyles(hover.frame, artboard.frame, zoom), dim: hover.frame.width }),
        React.createElement(LayerDim, { style: createDimHeightStyles(hover.frame, artboard.frame, zoom), dim: hover.frame.height })));
};
export default HoverDims;
