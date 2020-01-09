import React, { useRef, useState } from 'react';
import Artboard from './Artboard';
import CanvasControls from './CanvasControls';
import CanvasEscape from './CanvasEscape';
import { throttle } from '../utils';
const Canvas = (props) => {
    const canvas = useRef(null);
    const [zoom, setZoom] = useState(1);
    const zoomOut = throttle(() => {
        if (canvas.current && zoom > 0.1) {
            const newZoom = parseFloat((zoom - 0.1).toFixed(1));
            setZoom(newZoom);
        }
    }, 1500);
    const zoomIn = throttle(() => {
        if (canvas.current && zoom < 2) {
            const newZoom = parseFloat((zoom + 0.1).toFixed(1));
            setZoom(newZoom);
        }
    }, 1500);
    const handleKeyPress = (e) => {
        e.preventDefault();
        if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
            zoomOut();
        }
        else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
            zoomIn();
        }
    };
    return (React.createElement("div", { className: 'c-canvas', ref: canvas, onKeyDown: handleKeyPress, tabIndex: -1 },
        React.createElement(CanvasControls, { zoom: zoom, zoomIn: zoomIn, zoomOut: zoomOut }),
        React.createElement(Artboard, Object.assign({}, props, { zoom: zoom, style: {
                transform: `scale(${zoom})`
            } })),
        React.createElement(CanvasEscape, { setAppState: props.setAppState, onClick: () => { var _a; return (_a = canvas.current) === null || _a === void 0 ? void 0 : _a.focus(); } })));
};
export default Canvas;
