import React, { useState, useRef, useEffect } from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';
import { between } from '../utils';
const Canvas = (props) => {
    const { context } = props;
    const { zoom, updateZoom } = context;
    const [sectionSize, setSectionSize] = useState(100);
    //const [unitSize, setUnitSize] = useState(10);
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
        updateZoom(window.$startZoom * e.scale);
    };
    const handleGestureEnd = (e) => {
        e.preventDefault();
    };
    const updateSectionSize = () => {
        if (between(zoom, 1.5, 2)) {
            setSectionSize(50);
        }
        else if (between(zoom, 1, 1.5)) {
            setSectionSize(100);
        }
        else if (between(zoom, 0.75, 1)) {
            setSectionSize(150);
        }
        else if (between(zoom, 0.5, 0.75)) {
            setSectionSize(200);
        }
        else if (between(zoom, 0.25, 0.5)) {
            setSectionSize(250);
        }
        else if (between(zoom, 0.15, 0.25)) {
            setSectionSize(300);
        }
        else if (between(zoom, 0, 0.15)) {
            setSectionSize(350);
        }
    };
    // const updateUnitSize = () => {
    //   if (between(zoom, 1.5, 2)) {
    //     setUnitSize(5);
    //   } else if (between(zoom, 1, 1.5)) {
    //     setUnitSize(10);
    //   } else if (between(zoom, 0.75, 1)) {
    //     setUnitSize(15);
    //   } else if (between(zoom, 0.5, 0.75)) {
    //     setUnitSize(20);
    //   } else if (between(zoom, 0.25, 0.5)) {
    //     setUnitSize(25);
    //   } else if (between(zoom, 0.15, 0.25)) {
    //     setUnitSize(30);
    //   } else if (between(zoom, 0, 0.15)) {
    //     setUnitSize(35);
    //   }
    // }
    useEffect(() => {
        var _a, _b, _c;
        (_a = canvas.current) === null || _a === void 0 ? void 0 : _a.addEventListener('gesturestart', handleGestureStart);
        (_b = canvas.current) === null || _b === void 0 ? void 0 : _b.addEventListener('gesturechange', handleGestureChange);
        (_c = canvas.current) === null || _c === void 0 ? void 0 : _c.addEventListener('gestureend', handleGestureEnd);
    }, []);
    useEffect(() => {
        updateSectionSize();
        //updateUnitSize();
    }, [zoom]);
    return (React.createElement("div", { className: 'c-canvas', id: 'canvas', ref: canvas },
        React.createElement(CanvasRules, { leftScroll: props.leftScroll, topScroll: props.topScroll, sectionSize: sectionSize, unitSize: 1, canvasSize: props.canvasSize, zoom: zoom, artboardWidth: props.artboard.frame.width * zoom, artboardHeight: props.artboard.frame.height * zoom }),
        React.createElement(Artboard, { artboard: props.artboard, images: props.images, svgs: props.svgs, selection: props.selection, setSelection: props.setSelection, hover: props.hover, setHover: props.setHover, zoom: zoom }),
        React.createElement("div", { className: 'c-canvas__escape', onClick: handleClick, onMouseOver: handleMouseOver })));
};
export default Canvas;
