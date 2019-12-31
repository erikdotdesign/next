import React from 'react';
import Image from './Image';
import ShapePath from './ShapePath';
import Shape from './Shape';
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
    componentDidMount() {
        console.log(this.props.layer);
    }
    render() {
        const { layer, images, svgs } = this.props;
        switch (layer.type) {
            case 'Image':
                return (React.createElement(Image, { layer: layer, images: images, onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut }));
            case 'Shape':
                return (React.createElement(Shape, { layer: layer, images: images, svgs: svgs, onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut }));
            case 'ShapePath':
                return (React.createElement(ShapePath, { layer: layer, images: images, onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut }));
            case 'Text':
                return (React.createElement(Text, { layer: layer, onClick: this.onClick, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut }));
            default:
                return React.createElement("div", { className: 'c-layer' });
        }
    }
}
export default Layer;
