import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';

interface ShapeProps {
  layer: any;
}

class Shape extends React.Component<ShapeProps, {}> {
  render() {
    return (
      <div
        data-layer-name={this.props.layer.name}
        className='c-layer c-layer--shape'
        // @ts-ignore
        style={createBaseLayerStyles(this.props.layer)} />
    );
  }
}

export default Shape;
