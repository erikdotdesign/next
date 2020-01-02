import React from 'react';
import SidebarLayerValue from './SidebarLayerValue';
import SidebarLayerProp from './SidebarLayerProp';
import { createShapeStyles, createShapePathStyles, createArtboardStyles, createImageStyles, createSVGPath } from '../../utils/layerStyles';
import { textContainerStyles, textStyles } from '../../utils/textStyles';
const SidebarLayer = (props) => {
    const getLayerStyles = () => {
        switch (props.layer.type) {
            case 'Shape':
                return createShapeStyles(props.layer);
            case 'ShapePath':
                return createShapePathStyles(props.layer, props.images);
            case 'Image':
                return createImageStyles(props.layer, props.images);
            case 'Text':
                return Object.assign(Object.assign({}, textContainerStyles(props.layer)), textStyles(props.layer));
            case 'Artboard':
                return createArtboardStyles(props.layer);
        }
    };
    const getSVGPath = () => {
        const path = props.svgs[`${props.layer.id}`];
        return createSVGPath(path);
    };
    const svgPath = getSVGPath();
    const layerStyles = getLayerStyles();
    return (React.createElement("div", { className: 'c-sidebar__layer' },
        React.createElement("h2", { className: 'c-sidebar-layer__name' }, props.layer.name),
        React.createElement("div", { className: 'c-sidebar-layer__styles' },
            Object.keys(layerStyles).map((key, index) => (React.createElement("div", { className: 'c-sidebar-layer__css', key: index },
                React.createElement(SidebarLayerProp, { prop: key }),
                React.createElement(SidebarLayerValue, { value: layerStyles[key] })))),
            svgPath.d
                ? React.createElement("div", { className: 'c-sidebar-layer__css' },
                    React.createElement(SidebarLayerProp, { prop: 'd' }),
                    React.createElement(SidebarLayerValue, { value: `${svgPath.d}` }))
                : null)));
};
export default SidebarLayer;
