import React from 'react';
import Artboard from './Artboard';
import Layers from './Layers';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Selection from './Selection';
import Hover from './Hover';
const getExploadedLayers = (group) => {
    const groupFrame = group.frame;
    const newLayers = group.layers.map((layer) => {
        const layerFrame = layer.frame;
        const x = layerFrame.x + groupFrame.x;
        const y = layerFrame.y + groupFrame.y;
        return Object.assign(Object.assign({}, layer), { frame: Object.assign(Object.assign({}, layerFrame), { x, y }) });
    });
    return newLayers;
};
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selection: '',
            hover: '',
            group: ''
        };
        this.setAppState = (args) => {
            this.setState(args);
        };
        this.cancelSelection = () => {
            this.setState({
                selection: '',
                group: ''
            });
        };
    }
    render() {
        return (React.createElement("div", { className: 'c-app-wrap' },
            React.createElement("div", { className: 'c-app' },
                React.createElement(Sidebar, { appState: this.state }),
                React.createElement(Canvas, null,
                    React.createElement(Artboard, { artboard: this.props.artboard },
                        React.createElement(Layers, { layers: this.props.layers, setAppState: this.setAppState, appState: this.state, images: this.props.images }),
                        this.state.group
                            ? React.createElement(Layers, { layers: getExploadedLayers(this.state.group), setAppState: this.setAppState, appState: this.state, images: this.props.images })
                            : null,
                        this.state.selection
                            ? React.createElement(Selection, { layer: this.state.selection, artboard: this.props.artboard })
                            : null,
                        this.state.hover
                            ? React.createElement(Hover, { layer: this.state.hover, selection: this.state.selection, artboard: this.props.artboard })
                            : null,
                        React.createElement("div", { className: 'c-app__escape', onClick: this.cancelSelection }))))));
    }
}
export default App;
