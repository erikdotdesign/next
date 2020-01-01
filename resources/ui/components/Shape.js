import React from 'react';
import LayerSVG from './LayerSVG';
import { createShapeStyles } from '../../utils/layerStyles';
const Shape = (props) => {
    const { layer, svgs } = props;
    return (React.createElement("div", { onClick: props.onClick, onMouseOver: props.onMouseOver, onMouseOut: props.onMouseOut, className: 'c-layer c-layer--shape', style: createShapeStyles(props.layer) },
        React.createElement(LayerSVG, { layer: layer, path: svgs[`${layer.id}`] })));
};
export default Shape;
