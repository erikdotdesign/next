import React from 'react';
import ShapePathOdd from './ShapePathOdd';
import ShapePathClosed from './ShapePathClosed';
const ShapePath = (props) => {
    return (props.layer.closed
        ? React.createElement(ShapePathClosed, Object.assign({}, props))
        : React.createElement(ShapePathOdd, Object.assign({}, props)));
};
export default ShapePath;
