import React from 'react';
import { createImageStyles } from '../../utils/layerStyles';
class Image extends React.Component {
    render() {
        return (React.createElement("div", { "data-layer-name": this.props.layer.name, className: 'c-layer c-layer--image', 
            // @ts-ignore
            style: createImageStyles(this.props.layer, this.props.images) }));
    }
}
export default Image;
