import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';
class Slice extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-layer c-layer--slice', 
            // @ts-ignore
            style: createBaseLayerStyles(this.props.layer) }));
    }
}
export default Slice;
