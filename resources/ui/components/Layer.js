import React from 'react';
import LayerImage from './LayerImage';
import LayerShapePath from './LayerShapePath';
import LayerShape from './LayerShape';
import LayerText from './LayerText';
const Layer = (props) => {
    const { layer, images, svgs, setSelection, setHover } = props;
    const onClick = () => {
        setSelection(props.layer);
    };
    const onMouseOver = () => {
        setHover(props.layer);
    };
    const onMouseOut = () => {
        setHover('');
    };
    switch (layer.type) {
        case 'Image':
            return (React.createElement(LayerImage, { layer: layer, images: images, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'Shape':
            return (React.createElement(LayerShape, { layer: layer, images: images, svgs: svgs, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'ShapePath':
            return (React.createElement(LayerShapePath, { layer: layer, images: images, svgs: svgs, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'Text':
            return (React.createElement(LayerText, { layer: layer, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        default:
            return React.createElement("div", { className: 'c-layer' });
    }
};
export default Layer;
