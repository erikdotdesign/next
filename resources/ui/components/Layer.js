import React from 'react';
import Image from './Image';
import ShapePath from './ShapePath';
import Text from './Text';
class Layer extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            this.props.setAppState({
                selection: this.props.layer
            });
        };
        this.onMouseOver = () => {
            this.props.setAppState({
                hover: this.props.layer
            });
        };
        this.onMouseOut = () => {
            this.props.setAppState({
                hover: ''
            });
        };
    }
    render() {
        switch (this.props.layer.type) {
            case 'Image':
                return (React.createElement(Image, Object.assign({}, this.props, { onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut })));
            case 'ShapePath':
                return (React.createElement(ShapePath, Object.assign({}, this.props, { onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut })));
            case 'Text':
                return (React.createElement(Text, Object.assign({}, this.props, { onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut })));
            default:
                return React.createElement("div", { className: 'c-layer' });
        }
    }
}
export default Layer;
