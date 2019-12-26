import React from 'react';
import Layer from './Layer';
class Layers extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-layers' }, this.props.layers.map((layer, index) => (React.createElement(Layer, { layer: layer, key: index, images: this.props.images, setAppState: this.props.setAppState, appState: this.props.appState })))));
    }
}
export default Layers;
