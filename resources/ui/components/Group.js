import React from 'react';
import Layers from './Layers';
import { createGroupStyles } from '../../utils/layerStyles';
class Group extends React.Component {
    render() {
        return (React.createElement("div", { onClick: this.props.onClick, 
            //onDoubleClick={this.props.onDoubleClick}
            onMouseOver: this.props.onMouseOver, onMouseOut: this.props.onMouseOut, "data-layer-name": this.props.layer.name, className: 'c-layer c-layer--group', 
            // @ts-ignore
            style: createGroupStyles(this.props.layer) },
            React.createElement(Layers, Object.assign({ layers: this.props.layer.layers }, this.props))));
    }
}
export default Group;
