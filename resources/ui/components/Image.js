import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';
class Image extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-layer c-layer--image', 
            // @ts-ignore
            style: createBaseLayerStyles(this.props.layer) }));
    }
}
export default Image;
