import React from 'react';
import { createDimWidthStyles, createDimHeightStyles } from '../../utils/hoverStyles';
class HoverDims extends React.Component {
    render() {
        const { hover, artboard } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-selection__dim', style: createDimWidthStyles(hover.frame, artboard.frame) },
                hover.frame.width,
                "px"),
            React.createElement("div", { className: 'c-selection__dim', style: createDimHeightStyles(hover.frame, artboard.frame) },
                hover.frame.height,
                "px")));
    }
}
export default HoverDims;
