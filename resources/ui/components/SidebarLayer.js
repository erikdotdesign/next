import React from 'react';
// @ts-ignore
import hyphenate from 'hyphenate-style-name';
import { createShapePathStyles, createArtboardStyles, createImageStyles } from '../../utils/layerStyles';
import { textContainerStyles, textStyles } from '../../utils/textStyles';
class SidebarLayer extends React.Component {
    constructor() {
        super(...arguments);
        this.getLayerStyles = (layer) => {
            switch (layer.type) {
                case 'ShapePath':
                    return createShapePathStyles(layer, this.props.images);
                case 'Image':
                    return createImageStyles(layer, this.props.images);
                case 'Text':
                    return Object.assign(Object.assign({}, textContainerStyles(layer)), textStyles(layer));
                case 'Artboard':
                    return createArtboardStyles(layer);
            }
        };
    }
    render() {
        const { layer } = this.props;
        const layerStyles = this.getLayerStyles(layer);
        return (React.createElement("div", { className: 'c-sidebar__layer' },
            React.createElement("h2", { className: 'c-sidebar-layer__name' }, layer.name),
            React.createElement("div", { className: 'c-sidebar-layer__styles' }, layerStyles
                ? Object.keys(layerStyles).map((key, index) => (React.createElement("div", { className: 'c-sidebar-layer__css', key: index },
                    React.createElement("div", { className: 'c-sidebar-layer__prop' }, hyphenate(key)),
                    React.createElement("div", { className: 'c-sidebar-layer__value' },
                        React.createElement("input", { type: 'text', readOnly: true, value: layerStyles[key] })))))
                : null)));
    }
}
export default SidebarLayer;
