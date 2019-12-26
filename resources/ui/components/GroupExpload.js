import React from 'react';
import Layers from './Layers';
class GroupExpload extends React.Component {
    render() {
        return (React.createElement(Layers, { layers: this.props.layer.layers, onClick: this.props.onClick, onDoubleClick: this.props.onDoubleClick, onMouseOver: this.props.onMouseOver, onMouseOut: this.props.onMouseOut }));
    }
}
export default GroupExpload;
