import React from 'react';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import { createArtboardStyles } from '../../utils/layerStyles';
const Artboard = (props) => {
    const { artboard, images, svgs, setAppState, appState, zoom } = props;
    const { selection, hover } = appState;
    return (React.createElement("div", { className: 'c-artboard', style: Object.assign(Object.assign({}, createArtboardStyles(artboard)), { transform: `scale(${zoom})` }) },
        React.createElement(Layers, Object.assign({}, props)),
        selection
            ? React.createElement(Selection, { selection: selection, hover: hover, artboard: artboard, zoom: zoom })
            : null,
        hover
            ? React.createElement(Hover, { hover: hover, selection: selection, artboard: artboard, zoom: zoom })
            : null));
};
export default Artboard;
