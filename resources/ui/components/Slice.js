import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';
class Slice extends React.Component {
    render() {
        return (React.createElement("div", { onClick: this.props.onClick, onMouseOver: this.props.onMouseOver, onMouseOut: this.props.onMouseOut, className: 'c-layer c-layer--slice', 
            // @ts-ignore
            style: createBaseLayerStyles(this.props.layer) }));
    }
}
export default Slice;
