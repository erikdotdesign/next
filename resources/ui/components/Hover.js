import React from 'react';
import { createHoveredStyles, createDimWidthStyles, createDimHeightStyles } from '../../utils/hoverStyles';
class Hover extends React.Component {
    render() {
        const { layer, selection, artboard } = this.props;
        return (React.createElement("div", { className: 'c-layer c-layer--hover', style: createHoveredStyles(layer) }, !selection
            ? React.createElement("div", null,
                React.createElement("div", { className: 'c-selection__dim', style: createDimWidthStyles(layer, artboard) },
                    layer.frame.width,
                    "px"),
                React.createElement("div", { className: 'c-selection__dim', style: createDimHeightStyles(layer, artboard) },
                    layer.frame.height,
                    "px"))
            : null));
    }
}
export default Hover;
