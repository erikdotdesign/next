import React from 'react';
import { createImageStyles } from '../../utils/layerStyles';
const Image = (props) => (React.createElement("div", { onClick: props.onClick, onMouseOver: props.onMouseOver, onMouseOut: props.onMouseOut, className: 'c-layer c-layer--image', style: createImageStyles(props.layer, props.images) }));
export default Image;
