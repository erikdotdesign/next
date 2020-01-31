import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import ThemeContext from './ThemeContext';
import { createHoveredStyles } from '../styles/hoverStyles';
const Hover = (props) => {
    const { hover, selection, artboard, zoom } = props;
    return (React.createElement(ThemeContext.Consumer, null, (theme) => (React.createElement("div", { className: 'c-layer c-layer--hover', style: createHoveredStyles(hover, artboard, zoom, theme.palette.primary) }, selection
        ? React.createElement(HoverRules, { hover: hover, artboard: artboard, selection: selection, zoom: zoom })
        : React.createElement(HoverDims, { hover: hover, artboard: artboard, zoom: zoom })))));
};
export default Hover;
