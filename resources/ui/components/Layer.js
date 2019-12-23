import React from 'react';
import Group from './Group';
import Image from './Image';
import Shape from './Shape';
import ShapePath from './ShapePath';
import Text from './Text';
import Slice from './Slice';
class Layer extends React.Component {
    render() {
        const { layer } = this.props;
        const { type } = layer;
        if (type === 'Group') {
            return React.createElement(Group, { layer: layer });
        }
        else if (type === 'Image') {
            return React.createElement(Image, { layer: layer });
        }
        else if (type === 'Shape') {
            return React.createElement(Shape, { layer: layer });
        }
        else if (type === 'ShapePath') {
            return React.createElement(ShapePath, { layer: layer });
        }
        else if (type === 'Text') {
            return React.createElement(Text, { layer: layer });
        }
        else if (type === 'Slice') {
            return React.createElement(Slice, { layer: layer });
        }
        else {
            return React.createElement("div", { className: 'c-layer' });
        }
    }
}
export default Layer;
