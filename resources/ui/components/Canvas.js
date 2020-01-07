import React, { useRef, useState } from 'react';
import Artboard from './Artboard';
const Canvas = (props) => {
    const canvas = useRef(null);
    const [zoom, setZoom] = useState(1);
    const onClick = () => {
        if (canvas.current) {
            canvas.current.focus();
        }
        props.setAppState({
            selection: ''
        });
    };
    const onMouseOver = () => {
        props.setAppState({
            hover: ''
        });
    };
    const zoomOut = () => {
        if (canvas.current && zoom > 0.1) {
            const newZoom = parseFloat((zoom - 0.1).toFixed(1));
            setZoom(newZoom);
        }
    };
    const zoomIn = () => {
        if (canvas.current && zoom < 2) {
            const newZoom = parseFloat((zoom + 0.1).toFixed(1));
            setZoom(newZoom);
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
        React.createElement("div", { className: 'c-canvas__controls' },
            React.createElement("div", { className: 'c-canvas-control c-canvas-control--zoom' },
                React.createElement("div", { className: 'c-canvas-zoom__buttons' },
                    React.createElement("div", { className: 'c-canvas-zoom-button c-canvas-zoom-button--in', onClick: zoomIn }),
                    React.createElement("div", { className: 'c-canvas-zoom-button c-canvas-zoom-button--out', onClick: zoomOut })),
                React.createElement("div", { className: 'c-canvas-zoom__status' }, `${Math.round(zoom * 100)}%`)),
            React.createElement("div", { className: 'c-canvas-control c-canvas-control--layers' }, props.artboard.layers.length)),
        React.createElement("div", { className: 'c-canvas__canvas' },
            React.createElement(Artboard, Object.assign({}, props, { zoom: zoom }))),
        React.createElement("div", { className: 'c-canvas__escape', onClick: onClick, onMouseOver: onMouseOver })));
};
export default Canvas;
