import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';
class Shape extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-layer c-layer--shape', 
            // @ts-ignore
            style: createBaseLayerStyles(this.props.layer) }));
    }
}
export default Shape;
