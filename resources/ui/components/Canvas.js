import React from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';
const Canvas = (props) => {
    const handleClick = () => {
        props.setSelection('');
    };
    const handleMouseOver = () => {
        props.setHover('');
    };
    return (React.createElement("div", { className: 'c-canvas' },
        React.createElement(CanvasRules, { leftScroll: props.leftScroll, topScroll: props.topScroll, sectionSize: 100, unitSize: 10, canvasSize: props.canvasSize }),
        React.createElement(Artboard, { artboard: props.artboard, images: props.images, svgs: props.svgs, zoom: props.zoom, selection: props.selection, setSelection: props.setSelection, hover: props.hover, setHover: props.setHover }),
        React.createElement("div", { className: 'c-canvas__escape', onClick: handleClick, onMouseOver: handleMouseOver })));
};
export default Canvas;
