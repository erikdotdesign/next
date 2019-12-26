import React from 'react';
import { createShapePathStyles } from '../../utils/layerStyles';
class ShapePath extends React.Component {
    render() {
        return (React.createElement("div", { onClick: this.props.onClick, onMouseOver: this.props.onMouseOver, onMouseOut: this.props.onMouseOut, "data-layer-name": this.props.layer.name, className: 'c-layer c-layer--shape-path', 
            // @ts-ignore
            style: createShapePathStyles(this.props.layer, this.props.images) }));
    }
}
export default ShapePath;
