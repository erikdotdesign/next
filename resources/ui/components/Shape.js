import React from 'react';
import ShapeMarkers from './ShapeMarkers';
import { createShapeStyles, createShapeSVGPathStyles } from '../../utils/layerStyles';
const Shape = (props) => {
    const { layer, svgs } = props;
    const svg = svgs.find((svg) => svg.id === layer.id);
    return (React.createElement("svg", { className: 'c-layer c-layer--shape', style: createShapeStyles(layer), onClick: props.onClick, onMouseOver: props.onMouseOver, onMouseOut: props.onMouseOut },
        React.createElement(ShapeMarkers, { layer: layer }),
        React.createElement("path", { 
            //@ts-ignore
            style: createShapeSVGPathStyles(layer), markerEnd: 'url(#tail)', markerStart: 'url(#head)', d: svg.path })));
};
export default Shape;
