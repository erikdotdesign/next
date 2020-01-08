import React, { useRef, useState } from 'react';
import Artboard from './Artboard';
import { throttle } from '../../utils/appUtils';
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
        React.createElement("div", { className: 'c-canvas__controls' },
            React.createElement("div", { className: 'c-canvas-control c-canvas-control--zoom' },
                React.createElement("button", { className: 'c-canvas-zoom-button c-canvas-zoom-button--out', onClick: zoomOut },
                    React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" }),
                        React.createElement("path", { fill: "#fff", d: "M19 13H5v-2h14v2z" }))),
                React.createElement("div", { className: 'c-canvas-zoom__status' }, `${Math.round(zoom * 100)}%`),
                React.createElement("button", { className: 'c-canvas-zoom-button c-canvas-zoom-button--in', onClick: zoomIn },
                    React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" }),
                        React.createElement("path", { fill: "#fff", d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }))))),
        React.createElement("div", { className: 'c-canvas__artboard' },
            React.createElement(Artboard, Object.assign({}, props, { zoom: zoom }))),
        React.createElement("div", { className: 'c-canvas__escape', onClick: onClick, onMouseOver: onMouseOver })));
};
export default Canvas;
