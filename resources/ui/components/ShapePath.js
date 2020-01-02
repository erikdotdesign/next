import React from 'react';
import Shape from './Shape';
import ShapePathClosed from './ShapePathClosed';
const ShapePath = (props) => {
    return (props.layer.closed
        ? React.createElement(ShapePathClosed, Object.assign({}, props))
        : React.createElement(Shape, Object.assign({}, props)));
};
export default ShapePath;
