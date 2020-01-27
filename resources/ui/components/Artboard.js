import React, { useEffect, useRef } from 'react';
import Layers from './Layers';
import gsap from 'gsap';
import Selection from './Selection';
import GroupSelection from './GroupSelection';
import Hover from './Hover';
import artboardStyles from '../styles/artboardStyles';
const Artboard = (props) => {
    const artboardRef = useRef(null);
    const { artboard, images, svgs, selection, setSelection, groupSelection, setGroupSelection, groupSelectionNest, setGroupSelectionNest, hover, setHover, zoom, showNotes, edit, notes, setNotes, composing } = props;
    const onClick = () => {
        setSelection(artboard);
    };
    const onDoubleClick = () => {
        setGroupSelection(null);
        setGroupSelectionNest(null);
    };
    const onMouseOver = () => {
        setHover(artboard);
    };
    useEffect(() => {
        setSelection(artboard);
        console.log(artboard.layers);
    }, []);
    useEffect(() => {
        gsap.set(artboardRef.current, { scale: zoom });
    }, [zoom]);
    return (React.createElement("div", { id: artboard.id, className: 'c-artboard', ref: artboardRef, style: artboardStyles(artboard) },
        React.createElement("div", { className: 'c-artboard__layers' },
            React.createElement(Layers, { layers: artboard.layers, images: images, svgs: svgs, setSelection: setSelection, setGroupSelection: setGroupSelection, setHover: setHover })),
        groupSelection
            ? React.createElement(GroupSelection, { groupSelection: groupSelection, images: images, svgs: svgs, setSelection: setSelection, setGroupSelection: setGroupSelection, setHover: setHover, artboard: artboard })
            : null,
        selection
            ? React.createElement(Selection, { selection: selection, hover: hover, artboard: artboard, zoom: zoom })
            : null,
        hover
            ? React.createElement(Hover, { hover: hover, selection: selection, artboard: artboard, zoom: zoom })
            : null,
        React.createElement("div", { className: 'c-artboard__click-area', onClick: onClick, onDoubleClick: onDoubleClick, onMouseOver: onMouseOver })));
};
export default Artboard;
