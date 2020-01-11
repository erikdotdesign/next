import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import artboardStyles from '../styles/artboardStyles';
const Artboard = (props) => {
    const artboardRef = useRef(null);
    const { artboard, images, svgs, selection, setSelection, hover, setHover, zoom } = props;
    const onClick = () => {
        setSelection('');
    };
    const onMouseOver = () => {
        setHover(props.artboard);
    };
    useEffect(() => {
        gsap.set(artboardRef.current, { scale: zoom });
    }, [zoom]);
    return (React.createElement("div", { ref: artboardRef, className: 'c-artboard', id: 'artboard', style: artboardStyles(artboard) },
        React.createElement(Layers, { layers: artboard.layers, images: images, svgs: svgs, setSelection: setSelection, setHover: setHover, style: {
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
