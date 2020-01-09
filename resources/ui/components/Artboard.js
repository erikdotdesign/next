import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import artboardStyles from '../styles/artboardStyles';
gsap.registerPlugin(Draggable);
const Artboard = (props) => {
    const artboardRef = useRef(null);
    const { artboard, images, svgs, setAppState, appState, zoom, canvasSize } = props;
    const { selection, hover } = appState;
    const onClick = () => {
        props.setAppState({
            selection: ''
        });
    };
    const onMouseOver = () => {
        props.setAppState({
            hover: props.artboard
        });
    };
    const getArtboardSize = () => {
        const height = artboard.frame.height * zoom;
        const width = artboard.frame.width * zoom;
        return { width, height };
    };
    const centerArtboard = () => {
        const artboardSize = getArtboardSize();
        const xCenter = (canvasSize.width - artboardSize.width) / 2;
        const yCenter = (canvasSize.height - artboardSize.height) / 2;
        if (canvasSize.width > artboardSize.width && canvasSize.height > artboardSize.height) {
            gsap.set(artboardRef.current, { x: xCenter, y: yCenter });
        }
        else if (canvasSize.width > artboardSize.width) {
            gsap.set(artboardRef.current, { x: xCenter, y: 0 });
        }
        else if (canvasSize.height > artboardSize.height) {
            gsap.set(artboardRef.current, { x: 0, y: yCenter });
        }
    };
    // handle initial render
    useEffect(() => {
        Draggable.create(artboardRef.current, {
            inertia: true
        });
    }, []);
    // handle zoom changes
    useEffect(() => {
        gsap.set(artboardRef.current, { scale: zoom });
    }, [props.zoom]);
    // handle canvasSize changes
    useEffect(() => {
        centerArtboard();
    }, [props.canvasSize]);
    return (React.createElement("div", { ref: artboardRef, className: 'c-artboard', style: artboardStyles(artboard) },
        React.createElement(Layers, { layers: artboard.layers, images: images, svgs: svgs, setAppState: setAppState, appState: appState, style: {
                width: `${artboard.frame.width}px`,
                height: `${artboard.frame.height}px`
            } }),
        selection
            ? React.createElement(Selection, { selection: selection, hover: hover, artboard: artboard, zoom: zoom })
            : null,
        hover
            ? React.createElement(Hover, { hover: hover, selection: selection, artboard: artboard, zoom: zoom })
            : null,
        React.createElement("div", { className: 'c-artboard__click-area', onClick: onClick, onMouseOver: onMouseOver })));
};
export default Artboard;
