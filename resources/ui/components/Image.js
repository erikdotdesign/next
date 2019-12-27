import React from 'react';
import { createImageStyles } from '../../utils/layerStyles';
class Image extends React.Component {
    render() {
        return (React.createElement("div", { onClick: this.props.onClick, onMouseOver: this.props.onMouseOver, onMouseOut: this.props.onMouseOut, className: 'c-layer c-layer--image', 
            // @ts-ignore
            style: createImageStyles(this.props.layer, this.props.images) }));
    }
}
export default Image;
