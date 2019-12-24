import React from 'react';
import Artboard from './Artboard';
import Layers from './Layers';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
class App extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-app-wrap' },
            React.createElement("div", { className: 'c-app' },
                React.createElement(Sidebar, null),
                React.createElement(Canvas, null,
                    React.createElement(Artboard, { artboard: this.props.artboard },
                        React.createElement(Layers, { layers: this.props.layers }))))));
    }
}
export default App;
