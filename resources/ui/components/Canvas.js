import React from 'react';
import Artboard from './Artboard';
class Canvas extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            this.props.setAppState({
                selection: ''
            });
        };
        this.onMouseOver = () => {
            this.props.setAppState({
                hover: ''
            });
        };
    }
    render() {
        return (React.createElement("div", { className: 'c-canvas' },
            React.createElement(Artboard, Object.assign({}, this.props)),
            React.createElement("div", { className: 'c-canvas__escape', onClick: this.onClick, onMouseOver: this.onMouseOver })));
    }
}
export default Canvas;
