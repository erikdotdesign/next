import React, { useRef, useEffect } from 'react';
import Artboard from './Artboard';
let startGestureZoom = 0;
let gestureZoom = 1;
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
        startGestureZoom = gestureZoom;
    };
    const handleGestureChange = (e) => {
        e.preventDefault();
        props.setZoom(startGestureZoom * e.scale);
    };
    const handleGestureEnd = (e) => {
        e.preventDefault();
    };
    const handleWheel = (e) => {
        if (e.ctrlKey) {
            let nextZoom = gestureZoom - e.deltaY * 0.01;
            e.preventDefault();
            if (e.deltaY < 0 && nextZoom < 5) {
                props.setZoom(gestureZoom -= e.deltaY * 0.01);
            }
            else if (e.deltaY > 0 && nextZoom > 0) {
                props.setZoom(gestureZoom -= e.deltaY * 0.01);
            }
        }
    };
    useEffect(() => {
        var _a, _b, _c;
        (_a = canvas.current) === null || _a === void 0 ? void 0 : _a.addEventListener('gesturestart', handleGestureStart);
        (_b = canvas.current) === null || _b === void 0 ? void 0 : _b.addEventListener('gesturechange', handleGestureChange);
        (_c = canvas.current) === null || _c === void 0 ? void 0 : _c.addEventListener('gestureend', handleGestureEnd);
    }, []);
    useEffect(() => {
        gestureZoom = props.zoom;
    }, [props.zoom]);
    return (React.createElement("div", { className: 'c-canvas', id: 'canvas', ref: canvas, onWheel: handleWheel },
        React.createElement(Artboard, { artboard: props.artboard, images: props.images, svgs: props.svgs, selection: props.selection, setSelection: props.setSelection, hover: props.hover, setHover: props.setHover, zoom: props.zoom, showNotes: props.showNotes, edit: props.edit, setEdit: props.setEdit, notes: props.notes, setNotes: props.setNotes, composing: props.composing }),
        React.createElement("div", { className: 'c-canvas__escape', onClick: handleClick, onMouseOver: handleMouseOver })));
};
export default Canvas;
