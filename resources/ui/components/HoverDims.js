import React from 'react';
import { createDimWidthStyles, createDimHeightStyles } from '../styles/hoverStyles';
const HoverDims = (props) => (React.createElement("div", null,
    React.createElement("div", { className: 'c-selection__dim', style: createDimWidthStyles(props.hover.frame, props.artboard.frame, props.zoom) }, props.hover.frame.width),
    React.createElement("div", { className: 'c-selection__dim', style: createDimHeightStyles(props.hover.frame, props.artboard.frame, props.zoom) }, props.hover.frame.height)));
export default HoverDims;
