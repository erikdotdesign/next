import React from 'react';
import Layer from './Layer';
const Layers = (props) => (React.createElement("div", { className: 'c-layers', style: props.style }, props.layers.map((layer, index) => (React.createElement(Layer, { layer: layer, key: index, images: props.images, svgs: props.svgs, setAppState: props.setAppState, appState: props.appState })))));
export default Layers;
