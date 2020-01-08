import React from 'react';
import ShapeMarkers from './ShapeMarkers';
import shapeStyles from '../styles/shapeStyles';
import pathStyles from '../styles/pathStyles';
const Shape = (props) => {
    const { layer, svgs } = props;
    const svg = svgs.find((svg) => svg.id === layer.id);
    return (React.createElement("svg", { className: 'c-layer c-layer--shape', style: shapeStyles(layer), onClick: props.onClick, onMouseOver: props.onMouseOver, onMouseOut: props.onMouseOut },
        React.createElement(ShapeMarkers, { layer: layer }),
        React.createElement("path", { style: pathStyles(layer, svgs), markerEnd: 'url(#tail)', markerStart: 'url(#head)', d: svg.path })));
};
export default Shape;
