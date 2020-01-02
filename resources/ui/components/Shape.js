import React from 'react';
import { createShapeStyles } from '../../utils/layerStyles';
const Shape = (props) => {
    const { layer, svgs } = props;
    const path = svgs[`${layer.id}`];
    return (React.createElement("svg", { className: 'c-layer c-layer--shape', 
        // @ts-ignore
        style: createShapeStyles(layer, svgs), onClick: props.onClick, onMouseOver: props.onMouseOver, onMouseOut: props.onMouseOut },
        React.createElement("path", { d: path })));
};
export default Shape;
