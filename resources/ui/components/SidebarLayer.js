import React from 'react';
import SidebarLayerValue from './SidebarLayerValue';
import SidebarLayerProp from './SidebarLayerProp';
import artboardStyles from '../styles/artboardStyles';
import shapeStyles from '../styles/shapeStyles';
import shapePathStyles from '../styles/shapePathStyles';
import imageStyles from '../styles/imageStyles';
import pathStyles from '../styles/pathStyles';
import { textContainerStyles, textStyles } from '../styles/textStyles';
const SidebarLayer = (props) => {
    const { layer, images, svgs } = props;
    const getLayerStyles = () => {
        switch (layer.type) {
            case 'Shape':
                return Object.assign(Object.assign({}, shapeStyles(layer)), pathStyles(layer, svgs));
            case 'ShapePath':
                return shapePathStyles(layer, images, svgs);
            case 'Image':
                return imageStyles(layer, images);
            case 'Text':
                return Object.assign(Object.assign({}, textContainerStyles(layer)), textStyles(layer));
            case 'Artboard':
                return artboardStyles(layer);
        }
    };
    const layerStyles = getLayerStyles();
    return (React.createElement("div", { className: 'c-sidebar__layer' },
        React.createElement("div", { className: 'c-sidebar-layer__styles' }, Object.keys(layerStyles).map((key, index) => (React.createElement("div", { className: 'c-sidebar-layer__css', key: index },
            React.createElement(SidebarLayerProp, { prop: key }),
            React.createElement(SidebarLayerValue, { value: layerStyles[key] })))))));
};
export default SidebarLayer;
