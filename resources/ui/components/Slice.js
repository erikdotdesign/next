import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';
class Slice extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-layer c-layer--slice', style: createBaseLayerStyles(this.props.layer) }));
    }
}
export default Slice;
