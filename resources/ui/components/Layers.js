import React from 'react';
import Layer from './Layer';
const Layers = (props) => {
    return (React.createElement("div", { className: 'c-layers', style: props.style }, props.layers.map((layer, index) => (React.createElement(Layer, { layer: layer, key: index, images: props.images, svgs: props.svgs, setSelection: props.setSelection, setHover: props.setHover })))));
};
export default Layers;
