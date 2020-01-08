import React from 'react';
import Layer from './Layer';
const Layers = (props) => {
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
    return (React.createElement("div", { className: 'c-layers', style: {
            width: `${props.artboard.frame.width}px`,
            height: `${props.artboard.frame.height}px`
        } },
        props.artboard.layers.map((layer, index) => (React.createElement(Layer, { layer: layer, key: index, images: props.images, svgs: props.svgs, setAppState: props.setAppState, appState: props.appState }))),
        React.createElement("div", { className: 'c-layers__click-area', onClick: onClick, onMouseOver: onMouseOver })));
};
export default Layers;
