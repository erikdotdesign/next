import React from 'react';
import Artboard from './Artboard';
import Layer from './Layer';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Selection from './Selection';
import Hover from './Hover';
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selection: '',
            hover: ''
        };
        this.setAppState = (args) => {
            this.setState(args);
        };
        this.cancelSelection = () => {
            this.setState({
                selection: ''
            });
        };
    }
    render() {
        return (React.createElement("div", { className: 'c-app-wrap' },
            React.createElement("div", { className: 'c-app' },
                React.createElement(Sidebar, { appState: this.state, images: this.props.images }),
                React.createElement(Canvas, { onClick: () => this.setState({ selection: '' }), onMouseOver: () => this.setState({ hover: '' }) },
                    React.createElement(Artboard, { artboard: this.props.artboard, onClick: () => this.setState({ selection: '' }), onMouseOver: () => this.setState({ hover: this.props.artboard }) },
                        this.props.artboard.layers.map((layer, index) => (React.createElement(Layer, { layer: layer, key: index, images: this.props.images, setAppState: this.setAppState, appState: this.state }))),
                        this.state.selection
                            ? React.createElement(Selection, { selection: this.state.selection, hover: this.state.hover, artboard: this.props.artboard })
                            : null,
                        this.state.hover
                            ? React.createElement(Hover, { hover: this.state.hover, selection: this.state.selection, artboard: this.props.artboard })
                            : null)))));
    }
}
export default App;
