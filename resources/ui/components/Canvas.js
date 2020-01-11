import React, { useState, useRef, useEffect } from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';
const Canvas = (props) => {
    const [gestureZoom, setGestureZoom] = useState(1);
    const canvas = useRef(null);
    const handleClick = () => {
        props.setSelection('');
    };
    const handleMouseOver = () => {
        props.setHover('');
    };
    const handleGestureStart = (e) => {
        e.preventDefault();
    };
    const handleGestureChange = (e) => {
        e.preventDefault();
        setGestureZoom(e.scale);
    };
    const handleGestureEnd = (e) => {
        e.preventDefault();
    };
    const handlePan = () => {
        if (props.zoom < 4.98) {
            props.setZoom(props.zoom + 0.02);
        }
    };
    const handlePinch = () => {
        if (props.zoom > 0.01) {
            props.setZoom(props.zoom - 0.02);
        }
    };
    useEffect(() => {
        if (canvas.current) {
            canvas.current.addEventListener('gesturestart', handleGestureStart);
            canvas.current.addEventListener('gesturechange', handleGestureChange);
            canvas.current.addEventListener('gestureend', handleGestureEnd);
        }
    }, []);
    useEffect(() => {
        gestureZoom % Math.floor(gestureZoom) ? handlePan() : handlePinch();
    }, [gestureZoom]);
    return (React.createElement("div", { className: 'c-canvas', ref: canvas },
        React.createElement(CanvasRules, { leftScroll: props.leftScroll, topScroll: props.topScroll, sectionSize: 100, unitSize: 10, canvasSize: props.canvasSize }),
        React.createElement(Artboard, { artboard: props.artboard, images: props.images, svgs: props.svgs, zoom: props.zoom, selection: props.selection, setSelection: props.setSelection, hover: props.hover, setHover: props.setHover }),
        React.createElement("div", { className: 'c-canvas__escape', onClick: handleClick, onMouseOver: handleMouseOver })));
};
export default Canvas;
