import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import { createHoveredStyles } from '../styles/hoverStyles';
const Hover = (props) => (React.createElement("div", { className: 'c-layer c-layer--hover', style: createHoveredStyles(props.hover.frame, props.zoom) }, props.selection
    ? React.createElement(HoverRules, { hover: props.hover, selection: props.selection, zoom: props.zoom })
    : React.createElement(HoverDims, { hover: props.hover, artboard: props.artboard, zoom: props.zoom })));
export default Hover;
