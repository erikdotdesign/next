import React from 'react';
import { createDimWidthStyles, createDimHeightStyles } from '../styles/hoverStyles';
const HoverDims = (props) => {
    const { hover, artboard, zoom } = props;
    return (React.createElement("div", null,
        React.createElement("div", { className: 'c-selection__dim', style: createDimWidthStyles(hover.frame, artboard.frame, zoom) }, hover.frame.width),
        React.createElement("div", { className: 'c-selection__dim', style: createDimHeightStyles(hover.frame, artboard.frame, zoom) }, hover.frame.height)));
};
export default HoverDims;
