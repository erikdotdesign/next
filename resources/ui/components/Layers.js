import React from 'react';
import Layer from './Layer';
class Layers extends React.Component {
    componentDidMount() {
        console.log(this.props.layers);
    }
    render() {
        return (React.createElement("div", { className: 'c-layers' }, this.props.layers.map((layer, index) => {
            return (React.createElement(Layer, { layer: layer, key: index }));
        })));
    }
}
export default Layers;
