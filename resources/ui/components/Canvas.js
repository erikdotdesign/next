import React from 'react';
import Artboard from './Artboard';
const Canvas = (props) => {
    const onClick = () => {
        props.setAppState({
            selection: ''
        });
    };
    const onMouseOver = () => {
        props.setAppState({
            hover: ''
        });
    };
    return (React.createElement("div", { className: 'c-canvas' },
        React.createElement(Artboard, Object.assign({}, props)),
        React.createElement("div", { className: 'c-canvas__layer-count' }, props.artboard.layers.length),
        React.createElement("div", { className: 'c-canvas__escape', onClick: onClick, onMouseOver: onMouseOver })));
};
export default Canvas;
