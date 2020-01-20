import React, { useEffect, useRef } from 'react';
import Layers from './Layers';
import gsap from 'gsap';
import Selection from './Selection';
import Hover from './Hover';
import Notes from './Notes';
import NoteAdd from './NoteAdd';
import artboardStyles from '../styles/artboardStyles';
const Artboard = (props) => {
    const artboardRef = useRef(null);
    const { artboard, images, svgs, selection, setSelection, hover, setHover, zoom, showNotes, edit, setEdit, notes, setNotes, composing } = props;
    const onClick = () => {
        setSelection(artboard);
    };
    const onMouseOver = () => {
        setHover(artboard);
    };
    useEffect(() => {
        gsap.set(artboardRef.current, { scale: zoom });
    }, [zoom]);
    return (React.createElement("div", { className: 'c-artboard', ref: artboardRef, style: artboardStyles(artboard) },
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
        selection && edit && composing
            ? React.createElement(NoteAdd, { layer: selection, notes: notes, setNotes: setNotes, zoom: zoom })
            : null,
        showNotes
            ? React.createElement(Notes, { setSelection: setSelection, artboard: artboard, notes: notes })
            : null,
        React.createElement("div", { className: 'c-artboard__click-area', onClick: onClick, onMouseOver: onMouseOver })));
};
export default Artboard;
