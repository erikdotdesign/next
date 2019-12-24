import React from 'react';
import Layers from './Layers';
import { createGroupStyles } from '../../utils/layerStyles';
class Group extends React.Component {
    render() {
        return (
        // @ts-ignore
        React.createElement("div", { className: 'c-layer c-layer--group', style: createGroupStyles(this.props.layer) },
            React.createElement(Layers, { layers: this.props.layer.layers })));
    }
}
export default Group;
