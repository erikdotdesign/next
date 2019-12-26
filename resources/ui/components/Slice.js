import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';
class Slice extends React.Component {
    render() {
        return (React.createElement("div", { "data-layer-name": this.props.layer.name, className: 'c-layer c-layer--slice', 
            // @ts-ignore
            style: createBaseLayerStyles(this.props.layer) }));
    }
}
export default Slice;
