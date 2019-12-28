import React from 'react';
import { createArtboardStyles } from '../../utils/layerStyles';
class Artboard extends React.Component {
    componentDidMount() {
        console.log(this.props.artboard);
    }
    render() {
        return (React.createElement("div", { className: 'c-artboard', style: createArtboardStyles(this.props.artboard) },
            this.props.children,
            React.createElement("div", { className: 'c-artboard__click-area', onClick: this.props.onClick, onMouseOver: this.props.onMouseOver })));
    }
}
export default Artboard;
