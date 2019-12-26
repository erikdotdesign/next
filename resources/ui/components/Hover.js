import React from 'react';
import { createHoveredStyles, createDimWidthStyles, createDimHeightStyles } from '../../utils/selectionStyles';
class Hover extends React.Component {
    render() {
        const { layer, artboard } = this.props;
        return (React.createElement("div", { className: 'c-layer c-layer--hover', style: createHoveredStyles(layer) },
            React.createElement("div", { className: 'c-layer__dim c-layer__dim--width', style: createDimWidthStyles(layer, artboard) },
                layer.frame.width,
                "px"),
            React.createElement("div", { className: 'c-layer__dim c-layer__dim--height', style: createDimHeightStyles(layer, artboard) },
                layer.frame.height,
                "px"),
            React.createElement("div", { className: 'c-layer__rule c-layer__rule--t' }),
            React.createElement("div", { className: 'c-layer__rule c-layer__rule--r' }),
            React.createElement("div", { className: 'c-layer__rule c-layer__rule--b' }),
            React.createElement("div", { className: 'c-layer__rule c-layer__rule--l' })));
    }
}
export default Hover;
