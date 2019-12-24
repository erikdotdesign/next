import React from 'react';
import { createArtboardStyles } from '../../utils/layerStyles';
class Artboard extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-artboard', style: createArtboardStyles(this.props.artboard) }, this.props.children));
    }
}
export default Artboard;
