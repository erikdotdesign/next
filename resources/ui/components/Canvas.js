import React, { useRef, useState } from 'react';
import Artboard from './Artboard';
import CanvasControls from './CanvasControls';
import CanvasEscape from './CanvasEscape';
import { throttle, getOrigin } from '../utils';
const Canvas = (props) => {
    const canvas = useRef(null);
    const [zoom, setZoom] = useState(1);
    const [origin, setOrigin] = useState('center center');
    const zoomOut = throttle(() => {
        if (canvas.current && zoom > 0.1) {
            const newZoom = parseFloat((zoom - 0.1).toFixed(1));
            setZoom(newZoom);
            updateOrigin();
        }
    }, 1500);
    const zoomIn = throttle(() => {
        if (canvas.current && zoom < 2) {
            const newZoom = parseFloat((zoom + 0.1).toFixed(1));
            setZoom(newZoom);
            updateOrigin();
        }
    }, 1500);
    const updateOrigin = () => {
        if (props.appState.selection) {
            const newOrigin = getOrigin(props.appState.selection.frame);
            setOrigin(`${newOrigin.xCenter}px ${newOrigin.yCenter}px`);
        }
        else if (!props.appState.selection && origin !== `center center`) {
            setOrigin(`center center`);
        }
    };
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
        React.createElement(Artboard, Object.assign({}, props, { style: {
                transform: `scale(${zoom})`,
                transformOrigin: `${origin}`
            }, zoom: zoom })),
        React.createElement(CanvasEscape, { setAppState: props.setAppState, onClick: () => { var _a; return (_a = canvas.current) === null || _a === void 0 ? void 0 : _a.focus(); } })));
};
export default Canvas;
