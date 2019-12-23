import React from 'react';
import Group from './Group';
import Image from './Image';
import Shape from './Shape';
import ShapePath from './ShapePath';
import Text from './Text';
import Slice from './Slice';

interface LayerProps {
  layer: any;
}

class Layer extends React.Component<LayerProps, {}> {
  render() {
    const { layer } = this.props;
    const { type } = layer;
    if (type === 'Group') {
      return <Group layer={layer} />
    } else if (type === 'Image') {
      return <Image layer={layer} />
    } else if (type === 'Shape') {
      return <Shape layer={layer} />
    } else if (type === 'ShapePath') {
      return <ShapePath layer={layer} />
    } else if (type === 'Text') {
      return <Text layer={layer} />
    } else if (type === 'Slice') {
      return <Slice layer={layer} />
    } else {
      return <div className='c-layer' />
    }
  }
}

export default Layer;
