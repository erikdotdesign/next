import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';

interface ShapeProps {
  layer: any;
}

class Shape extends React.Component<ShapeProps, {}> {
  render() {
    return (
      <div
        className='c-layer c-layer--shape'
        style={createBaseLayerStyles(this.props.layer)} />
    );
  }
}

export default Shape;
