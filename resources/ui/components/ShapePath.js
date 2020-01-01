import React from 'react';
import { createShapePathStyles } from '../../utils/layerStyles';
const ShapePath = (props) => (React.createElement("div", { onClick: props.onClick, onMouseOver: props.onMouseOver, onMouseOut: props.onMouseOut, className: 'c-layer c-layer--shape-path', style: createShapePathStyles(props.layer, props.images) }));
export default ShapePath;
