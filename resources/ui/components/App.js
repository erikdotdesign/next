import React, { useRef, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import TopBar from './TopBar';
const App = (props) => {
    const app = useRef(null);
    const [ready, setReady] = useState(false);
    // selection and hover
    const [selection, setSelection] = useState(null);
    const [hover, setHover] = useState(null);
    // zoom
    const [zoom, setZoom] = useState(1);
    const [baseZoom, setBaseZoom] = useState(1);
    // scroll
    const canvasSize = 20000;
    const [centerScroll, setCenterScroll] = useState({ x: 0, y: 0 });
    const [viewPortSize, setViewPortSize] = useState({ width: 0, height: 0 });
    // notes
    const [notes, setNotes] = useState(props.notes);
    const [showNotes, setShowNotes] = useState(true);
    const [edit, setEdit] = useState(true);
    const scaleArtboardForViewport = () => {
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
        return {
            width: window.innerWidth - 320,
            height: window.innerHeight - 48
        };
    };
    const handleResize = () => {
        setViewPortSize(getViewPortSize());
    };
    const handleInitialRender = (callback) => {
        handleResize();
        callback();
    };
    const scrollToCenter = () => {
        window.scrollTo(centerScroll.x, centerScroll.y);
    };
    const handleKeyPress = (e) => {
        if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
            e.preventDefault();
            setZoom(zoom - 0.1);
        }
        else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
            e.preventDefault();
            setZoom(zoom + 0.1);
        }
        else if (e.key === 'Enter' && e.metaKey && e.altKey && e.ctrlKey) {
            e.preventDefault();
            setZoom(baseZoom);
            scrollToCenter();
        }
    };
    useEffect(() => {
        var _a;
        // focus app for key events
        (_a = app.current) === null || _a === void 0 ? void 0 : _a.focus();
        // set reszie listener
        window.addEventListener('resize', handleResize);
        // set viewportsize
        // scale artboard
        // set app ready
        handleInitialRender(() => setReady(true));
    }, []);
    useEffect(() => {
        // get and set base zoom
        const artboardScale = scaleArtboardForViewport();
        setZoom(artboardScale);
        setBaseZoom(artboardScale);
        // get artboard size
        const artboardHeight = props.artboard.frame.height * artboardScale;
        const artboardWidth = props.artboard.frame.width * artboardScale;
        const artboardHeightMid = artboardHeight / 2;
        const artboardWidthMid = artboardWidth / 2;
        // get and set offsets
        const canvasCenter = canvasSize / 2;
        const leftOffset = canvasCenter - artboardWidthMid;
        const topOffset = canvasCenter - artboardHeightMid;
        const rightRemainder = viewPortSize.width - artboardWidth;
        const bottomRemainder = viewPortSize.height - artboardHeight;
        // scroll to center
        window.scrollTo(leftOffset - (rightRemainder / 2), topOffset - (bottomRemainder / 2));
        // set center scroll position
        setCenterScroll({
            x: leftOffset - (rightRemainder / 2),
            y: topOffset - (bottomRemainder / 2)
        });
    }, [viewPortSize]);
    // SCROLL PERFORMANCE IS HORRIBLE ON SAFARI FOR NESTED COMPONENTS
    return (React.createElement("div", { className: 'c-app', tabIndex: -1, ref: app, onKeyDown: handleKeyPress },
        React.createElement(TopBar, { selection: selection, zoom: zoom, setZoom: setZoom, baseZoom: baseZoom, notes: notes, showNotes: showNotes, setShowNotes: setShowNotes, edit: edit, setEdit: setEdit, scrollToCenter: scrollToCenter, composing: props.composing }),
        React.createElement(Sidebar, { selection: selection, images: props.images, svgs: props.svgs, notes: notes, setNotes: setNotes, edit: edit, composing: props.composing }),
        React.createElement(Canvas, Object.assign({}, props, { ready: ready, zoom: zoom, setZoom: setZoom, selection: selection, setSelection: setSelection, hover: hover, setHover: setHover, viewPortSize: viewPortSize, showNotes: showNotes, edit: edit, setEdit: setEdit, notes: notes, setNotes: setNotes, composing: props.composing }))));
};
export default App;
