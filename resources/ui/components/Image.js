import React from 'react';
import imageStyles from '../styles/imageStyles';
const Image = (props) => (React.createElement("div", { onClick: props.onClick, onMouseOver: props.onMouseOver, onMouseOut: props.onMouseOut, className: 'c-layer c-layer--image', style: imageStyles(props.layer, props.images) }));
export default Image;
