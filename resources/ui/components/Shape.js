import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';
class Shape extends React.Component {
    render() {
        const shapeSvgs = this.props.svgs.filter((svg) => {
            return svg.parentId === this.props.layer.id;
        });
        return (React.createElement("div", { onClick: this.props.onClick, onMouseOver: this.props.onMouseOver, onMouseOut: this.props.onMouseOut, className: 'c-layer c-layer--shape', style: createBaseLayerStyles(this.props.layer) },
            React.createElement("svg", { viewBox: `0 0 ${this.props.layer.frame.width} ${this.props.layer.frame.height}`, width: this.props.layer.frame.width, height: this.props.layer.frame.height }, shapeSvgs.map((svg, index) => (React.createElement("path", { key: index, d: svg.svgPath }))))));
    }
}
export default Shape;
