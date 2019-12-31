import React from 'react';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import { createArtboardStyles } from '../../utils/layerStyles';
class Artboard extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            this.props.setAppState({
                selection: ''
            });
        };
        this.onMouseOver = () => {
            this.props.setAppState({
                hover: this.props.artboard
            });
        };
    }
    render() {
        const { artboard, images, svgs, setAppState, appState } = this.props;
        const { selection, hover } = appState;
        return (React.createElement("div", { className: 'c-artboard', style: createArtboardStyles(artboard) },
            React.createElement(Layers, { layers: artboard.layers, images: images, svgs: svgs, setAppState: setAppState, appState: appState }),
            selection
                ? React.createElement(Selection, { selection: selection, hover: hover, artboard: artboard })
                : null,
            hover
                ? React.createElement(Hover, { hover: hover, selection: selection, artboard: artboard })
                : null,
            React.createElement("div", { className: 'c-artboard__click-area', onClick: this.onClick, onMouseOver: this.onMouseOver })));
    }
}
export default Artboard;
