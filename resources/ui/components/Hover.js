import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import { createHoveredStyles } from '../styles/hoverStyles';
const Hover = (props) => {
    const { hover, selection, artboard, zoom } = props;
    const { frame } = hover;
    return (React.createElement("div", { className: 'c-layer c-layer--hover', style: createHoveredStyles(frame, zoom) }, selection
        ? React.createElement(HoverRules, { hover: hover, selection: selection, zoom: zoom })
        : React.createElement(HoverDims, { hover: hover, artboard: artboard, zoom: zoom })));
};
export default Hover;
