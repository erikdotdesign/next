import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import artboardStyles from '../styles/artboardStyles';
gsap.registerPlugin(ScrollToPlugin);
const Artboard = (props) => {
    const artboardRef = useRef(null);
    const { artboard, images, svgs, setAppState, appState, canvasSize } = props;
    const { selection, hover, zoom } = appState;
    const getArtboardSize = () => {
        const height = artboard.frame.height * zoom;
        const width = artboard.frame.width * zoom;
        return { width, height };
    };
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
    const scaleToFitViewport = () => {
        const viewPortSize = getViewPortSize();
        const artboardWidth = artboard.frame.width;
        const artboardHeight = artboard.frame.height;
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
    useEffect(() => {
        if (artboardRef.current) {
            // get initial zoom and new dims
            const initialZoom = scaleToFitViewport();
            const newArtboardWidth = artboard.frame.width * initialZoom;
            const newArtboardHeight = artboard.frame.height * initialZoom;
            // set initial zoom
            props.setAppState({
                zoom: initialZoom
            });
            // console.log(newArtboardWidth, newArtboardHeight);
            // // scroll to resized artboard
            // const offsetX = 10000 - (newArtboardWidth * (2 - initialZoom));
            // const offsetY = 10000 - (newArtboardHeight * (2 - initialZoom));
            gsap.to(window, { duration: 0.01, scrollTo: { x: 10000, y: 10000 } });
        }
    }, []);
    useEffect(() => {
        gsap.set(artboardRef.current, { scale: zoom });
    }, [appState.zoom]);
    return (React.createElement("div", { ref: artboardRef, className: 'c-artboard', id: 'artboard', style: artboardStyles(artboard) },
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
// const getArtboardSize = () => {
//   const height = artboard.frame.height * zoom;
//   const width = artboard.frame.width * zoom;
//   return {width, height};
// }
// const centerArtboard = () => {
//   const artboardSize = getArtboardSize();
//   const xCenter = (canvasSize.width - artboardSize.width) / 2;
//   const yCenter = (canvasSize.height - artboardSize.height) / 2;
//   if (canvasSize.width > artboardSize.width && canvasSize.height > artboardSize.height) {
//     gsap.set(artboardRef.current, {x: xCenter, y: yCenter});
//   } else if (canvasSize.width > artboardSize.width) {
//     gsap.set(artboardRef.current, {x: xCenter, y: 0});
//   } else if (canvasSize.height > artboardSize.height) {
//     gsap.set(artboardRef.current, {x: 0, y: yCenter});
//   }
// }
// // handle initial render
// useEffect(() => {
//   Draggable.create(artboardRef.current, {
//     inertia: true
//   });
// }, []);
// // handle zoom changes
// useEffect(() => {
//   gsap.set(artboardRef.current, {scale: zoom});
// }, [props.zoom]);
// // handle canvasSize changes
// useEffect(() => {
//   centerArtboard();
// }, [props.canvasSize]);
