import React from 'react';
import Image from './Image';
import ShapePath from './ShapePath';
import Shape from './Shape';
import Text from './Text';
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
            return (React.createElement(Image, { layer: layer, images: images, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'Shape':
            return (React.createElement(Shape, { layer: layer, images: images, svgs: svgs, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'ShapePath':
            return (React.createElement(ShapePath, { layer: layer, images: images, svgs: svgs, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'Text':
            return (React.createElement(Text, { layer: layer, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        default:
            return React.createElement("div", { className: 'c-layer' });
    }
};
export default Layer;
