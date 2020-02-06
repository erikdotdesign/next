import React from 'react';
import LayerGroup from './LayerGroup';
import LayerImage from './LayerImage';
import LayerShapePath from './LayerShapePath';
import LayerShape from './LayerShape';
import LayerText from './LayerText';
const Layer = (props) => {
    const { layer, images, svgs, setSelection, setGroupSelection, setHover } = props;
    const onClick = () => {
        setSelection(layer);
    };
    const onDoubleClick = () => {
        setGroupSelection(layer);
    };
    const onMouseOver = () => {
        setHover(layer);
    };
    const onMouseOut = () => {
        setHover(null);
    };
    switch (layer.type) {
        case 'Group':
            return (React.createElement(LayerGroup, { layer: layer, images: images, svgs: svgs, onClick: onClick, onDoubleClick: onDoubleClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut, setSelection: props.setSelection, setGroupSelection: props.setGroupSelection, setHover: props.setHover }));
        case 'Image':
            return (React.createElement(LayerImage, { layer: layer, images: images, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'Shape':
            return (React.createElement(LayerShape, { layer: layer, images: images, svgs: svgs, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'ShapePath':
            return (React.createElement(LayerShapePath, { layer: layer, images: images, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        case 'Text':
            return (React.createElement(LayerText, { layer: layer, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut }));
        default:
            return React.createElement("div", { className: 'c-layer' });
    }
};
export default Layer;
