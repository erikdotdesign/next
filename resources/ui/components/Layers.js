import React from 'react';
import Layer from './Layer';
const Layers = (props) => {
    return (React.createElement("div", { className: 'c-layers' }, props.layers.map((layer, index) => (React.createElement(Layer, { layer: layer, key: index, images: props.images, svgs: props.svgs, setSelection: props.setSelection, setGroupSelection: props.setGroupSelection, setHover: props.setHover })))));
};
export default Layers;
