import React from 'react';
import Layers from './Layers';
class Artboard extends React.Component {
    componentDidMount() {
        console.log(this.props.artboard);
    }
    render() {
        const { frame, background, layers } = this.props.artboard;
        const bg = background.enabled ? background.color : 'transparent';
        return (React.createElement("div", { className: 'c-artboard', style: {
                width: frame.width,
                height: frame.height,
                background: bg
            } },
            React.createElement(Layers, { layers: layers })));
    }
}
export default Artboard;
