import React from 'react';
import { createShapePathStyles } from '../../utils/layerStyles';

interface ShapePathProps {
  layer: any;
}

class ShapePath extends React.Component<ShapePathProps, {}> {
  render() {
    return (
      <div
        className='c-layer c-layer--shape-path'
        // @ts-ignore
        style={createShapePathStyles(this.props.layer)} />
    );
  }
}

export default ShapePath;
