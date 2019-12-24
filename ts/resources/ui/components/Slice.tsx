import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';

interface SliceProps {
  layer: any;
}

class Slice extends React.Component<SliceProps, {}> {
  render() {
    return (
      <div
        className='c-layer c-layer--slice'
        // @ts-ignore
        style={createBaseLayerStyles(this.props.layer)} />
    );
  }
}

export default Slice;
