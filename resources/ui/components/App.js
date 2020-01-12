import React, { useRef, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Topbar from './Topbar';
const App = (props) => {
    const app = useRef(null);
    const canvasSize = 20000;
    const [selection, setSelection] = useState('');
    const [hover, setHover] = useState('');
    const [leftScroll, setLeftScroll] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [baseZoom, setBaseZoom] = useState(1);
    const [topScroll, setTopScroll] = useState(0);
    const [viewPortSize, setViewPortSize] = useState({ width: 0, height: 0 });
    const scaleToFitViewport = () => {
        const artboardWidth = props.artboard.frame.width;
        const artboardHeight = props.artboard.frame.height;
        const maxWidth = Math.min(viewPortSize.width, artboardWidth);
        const maxHeight = Math.min(viewPortSize.height, artboardHeight);
        const maxRatio = maxWidth / maxHeight;
        const artboardRatio = artboardWidth / artboardHeight;
        // dims of artboard scaled to fit in viewport
        if (maxRatio > artboardRatio) {
            // height is the constraining dimension
            return maxHeight / artboardHeight;
        }
        else {
            // width is the constraining dimension
            return maxWidth / artboardWidth;
        }
    };
    const getViewPortSize = () => {
        // subtract sidebar width + left rule width
        const viewportWidth = window.innerWidth - 320;
        // subtract artboard padding + top rule height
        const viewportHeight = window.innerHeight - 24 * 3;
        return {
            width: viewportWidth,
            height: viewportHeight
        };
    };
    const handleScroll = () => {
        setLeftScroll(window.scrollX);
        setTopScroll(window.scrollY);
    };
    const handleResize = () => {
        setViewPortSize(getViewPortSize());
    };
    const handleKeyPress = (e) => {
        e.preventDefault();
        if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
            setZoom(zoom - 0.1);
        }
        else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
            setZoom(zoom + 0.1);
        }
        else if (e.key === 'Enter' && e.metaKey && e.altKey && e.ctrlKey) {
            setZoom(baseZoom);
            window.scrollTo(canvasSize / 2, canvasSize / 2);
        }
    };
    useEffect(() => {
        var _a;
        (_a = app.current) === null || _a === void 0 ? void 0 : _a.focus();
        // set scroll listener
        window.addEventListener('scroll', handleScroll);
        // set reszie listener
        window.addEventListener('resize', handleResize);
        // set viewportsize
        setViewPortSize(getViewPortSize());
    }, []);
    useEffect(() => {
        const initialZoom = scaleToFitViewport();
        setZoom(initialZoom);
        setBaseZoom(initialZoom);
        // window.$baseZoom = initialZoom;
        // window.$zoom = initialZoom;
        // window.$renderZoom();
        window.scrollTo(canvasSize / 2, canvasSize / 2);
    }, [viewPortSize]);
    return (React.createElement("div", { className: 'c-app', tabIndex: -1, ref: app, onKeyDown: handleKeyPress },
        React.createElement(Topbar, { zoom: zoom, setZoom: setZoom, baseZoom: baseZoom, canvasSize: canvasSize }),
        React.createElement(Sidebar, { selection: selection, hover: hover, images: props.images, svgs: props.svgs }),
        React.createElement(Canvas, Object.assign({}, props, { zoom: zoom, setZoom: setZoom, selection: selection, setSelection: setSelection, hover: hover, setHover: setHover, leftScroll: leftScroll, topScroll: topScroll, viewPortSize: viewPortSize, canvasSize: canvasSize }))));
};
export default App;
