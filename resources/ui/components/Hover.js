import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import { createHoveredStyles } from '../../utils/hoverStyles';
const Hover = (props) => (React.createElement("div", { className: 'c-layer c-layer--hover', style: createHoveredStyles(props.hover.frame) }, props.selection
    ? React.createElement(HoverRules, { hover: props.hover, selection: props.selection })
    : React.createElement(HoverDims, { hover: props.hover, artboard: props.artboard })));
export default Hover;
