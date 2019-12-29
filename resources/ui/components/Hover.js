import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import { createHoveredStyles } from '../../utils/hoverStyles';
class Hover extends React.Component {
    render() {
        const { hover, selection, artboard } = this.props;
        return (React.createElement("div", { className: 'c-layer c-layer--hover', style: createHoveredStyles(hover.frame) }, selection
            ? React.createElement(HoverRules, { hover: hover, selection: selection })
            : React.createElement(HoverDims, { hover: hover, artboard: artboard })));
    }
}
export default Hover;
