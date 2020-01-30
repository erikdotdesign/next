import React, { useRef, useState, useEffect } from 'react';
import SidebarRight from './SidebarRight';
import SidebarLeft from './SidebarLeft';
import Canvas from './Canvas';
import TopBar from './TopBar';
import ThemeProvider from './ThemeProvider';
import ThemeContext from './ThemeContext';
const App = (props) => {
    const app = useRef(null);
    const [ready, setReady] = useState(false);
    const [appTheme, setAppTheme] = useState(props.theme);
    // selection and hover
    const [groupSelectionNest, setGroupSelectionNest] = useState(null);
    const [groupSelection, setGroupSelection] = useState(null);
    const [selection, setSelection] = useState(null);
    const [hover, setHover] = useState(null);
    // zoom
    const [zoom, setZoom] = useState(1);
    const [baseZoom, setBaseZoom] = useState(1);
    // scroll
    const canvasSize = 20000;
    const sidebarSize = 320;
    const [centerScroll, setCenterScroll] = useState({ x: 0, y: 0 });
    const [viewPortSize, setViewPortSize] = useState({ width: 0, height: 0 });
    // notes
    const [notes, setNotes] = useState(props.notes);
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
            width: window.innerWidth - sidebarSize * 2,
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
    // update groupSelectionNest on group selection change
    useEffect(() => {
        if (groupSelection) {
            // check if groupSelectionNest exists
            if (groupSelectionNest) {
                // if groupSelectionNest exists,
                // check if it contains groupSelection
                const nestContainsGroup = groupSelectionNest.find((group) => {
                    return group.id === groupSelection.id;
                });
                // if groupSelectionNest contains groupSelection,
                // create new groupSelectionNest with all the parents up to groupSelection
                if (nestContainsGroup) {
                    let i = 0;
                    let newNest = [];
                    while (groupSelectionNest[i].id !== groupSelection.id) {
                        newNest.push(groupSelectionNest[i]);
                        i++;
                    }
                    setGroupSelectionNest([...newNest, groupSelection]);
                }
                else {
                    // if groupSelectionNest does not contain groupSelection,
                    // add groupSelection to the end of groupSelectionNest
                    setGroupSelectionNest([...groupSelectionNest, groupSelection]);
                }
            }
            else {
                // if groupSelectionNest does not exist,
                // initialize it with groupSelection
                setGroupSelectionNest([groupSelection]);
            }
        }
    }, [groupSelection]);
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
        const leftOffset = canvasCenter - artboardWidthMid - sidebarSize;
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
    return (React.createElement(ThemeProvider, { theme: appTheme },
        React.createElement(ThemeContext.Consumer, null, (theme) => (React.createElement("div", { className: 'c-app', tabIndex: -1, ref: app, onKeyDown: handleKeyPress, style: {
                background: theme.background.z1
            } },
            React.createElement(TopBar, { zoom: zoom, setZoom: setZoom, baseZoom: baseZoom, notes: notes, scrollToCenter: scrollToCenter, appTheme: appTheme, setAppTheme: setAppTheme, composing: props.composing }),
            React.createElement(SidebarLeft, { selection: selection, setSelection: setSelection, hover: hover, setHover: setHover, notes: notes, groupSelection: groupSelection, setGroupSelection: setGroupSelection, groupSelectionNest: groupSelectionNest, setGroupSelectionNest: setGroupSelectionNest, artboard: props.artboard }),
            React.createElement(SidebarRight, { selection: selection, images: props.images, svgs: props.svgs, notes: notes, setNotes: setNotes, composing: props.composing }),
            React.createElement(Canvas, Object.assign({}, props, { ready: ready, zoom: zoom, setZoom: setZoom, selection: selection, setSelection: setSelection, groupSelection: groupSelection, setGroupSelection: setGroupSelection, groupSelectionNest: groupSelectionNest, setGroupSelectionNest: setGroupSelectionNest, hover: hover, setHover: setHover })))))));
};
export default App;
