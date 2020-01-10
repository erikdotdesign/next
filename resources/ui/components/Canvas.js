import React, { useRef, useState, useEffect } from 'react';
import Artboard from './Artboard';
import CanvasEscape from './CanvasEscape';
import CanvasRules from './CanvasRules';
const Canvas = (props) => {
    const canvasSize = 20000;
    const canvas = useRef(null);
    const [leftScroll, setLeftScroll] = useState(0);
    const [topScroll, setTopScroll] = useState(0);
    const handleScroll = () => {
        if (canvas.current) {
            setLeftScroll(window.scrollX);
            setTopScroll(window.scrollY);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);
    return (React.createElement("div", { className: 'c-canvas', ref: canvas },
        React.createElement(CanvasRules, { leftScroll: leftScroll, topScroll: topScroll, sectionSize: 100, unitSize: 10, canvasSize: canvasSize }),
        React.createElement(Artboard, Object.assign({}, props, { canvasSize: canvasSize })),
        React.createElement(CanvasEscape, { setAppState: props.setAppState, onClick: () => { var _a; return (_a = canvas.current) === null || _a === void 0 ? void 0 : _a.focus(); } })));
};
export default Canvas;
// const [zoom, setZoom] = useState(1);
//   const zoomOut = () => {
//     const newZoom = zoom - 0.1;
//     setZoom(newZoom);
//   };
//   const zoomIn = () => {
//     const newZoom = zoom + 0.1;
//     setZoom(newZoom);
//   };
//   const refresh = () => {
//     return;
//   };
//   const handleKeyPress = (e: any) => {
//     e.preventDefault();
//     if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
//       zoomOut();
//     } else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
//       zoomIn();
//     } else if (e.key === 'Enter' && e.metaKey && e.altKey && e.ctrlKey) {
//       refresh();
//     }
//   }
// const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
// const getCanvasSize = () => {
//   if (canvas.current) {
//     const width = canvas.current.clientWidth;
//     const height = canvas.current.clientHeight;
//     return {width, height};
//   } else {
//     return {width: 0, height: 0};
//   }
// }
// const scaleToFitCanvas = () => {
//   if (canvas.current) {
//     const canvasSize = getCanvasSize();
//     const artboardHeight = props.artboard.frame.height;
//     const artboardWidth = props.artboard.frame.width;
//     const maxHeight = Math.min(canvasSize.height, artboardHeight);
//     const maxWidth = Math.min(canvasSize.width, artboardWidth);
//     const maxRatio = maxWidth / maxHeight;
//     const artboardRatio = artboardWidth / artboardHeight;
//     // dims of artboard scaled to fit in viewport
//     if (maxRatio > artboardRatio) {
//       // height is the constraining dimension
//       return maxHeight / artboardHeight;
//     } else {
//       // width is the constraining dimension
//       return maxWidth / artboardWidth;
//     }
//   } else {
//     return 1;
//   }
// }
// useEffect(() => {
//   refresh();
// }, []);
