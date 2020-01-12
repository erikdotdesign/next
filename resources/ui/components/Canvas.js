import React, { useRef, useEffect } from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';
const Canvas = (props) => {
    const canvas = useRef(null);
    const handleClick = () => {
        props.setSelection('');
    };
    const handleMouseOver = () => {
        props.setHover('');
    };
    const handleGestureStart = (e) => {
        e.preventDefault();
        window.$startZoom = window.$zoom;
    };
    const handleGestureChange = (e) => {
        e.preventDefault();
        window.$zoom = window.$startZoom * e.scale;
        window.$renderZoom();
        props.updateZoom(window.$startZoom * e.scale);
    };
    const handleGestureEnd = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        if (canvas.current) {
            canvas.current.addEventListener('gesturestart', handleGestureStart);
            canvas.current.addEventListener('gesturechange', handleGestureChange);
            canvas.current.addEventListener('gestureend', handleGestureEnd);
        }
    }, []);
    return (React.createElement("div", { className: 'c-canvas', ref: canvas },
        React.createElement(CanvasRules, { leftScroll: props.leftScroll, topScroll: props.topScroll, sectionSize: 100, unitSize: 10, canvasSize: props.canvasSize }),
        React.createElement(Artboard, { artboard: props.artboard, images: props.images, svgs: props.svgs, selection: props.selection, setSelection: props.setSelection, hover: props.hover, setHover: props.setHover, zoom: props.zoom }),
        React.createElement("div", { className: 'c-canvas__escape', onClick: handleClick, onMouseOver: handleMouseOver })));
};
export default Canvas;
