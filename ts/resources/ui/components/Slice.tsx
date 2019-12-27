import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';

interface SliceProps {
  layer: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

class Slice extends React.Component<SliceProps, {}> {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        className='c-layer c-layer--slice'
        // @ts-ignore
        style={createBaseLayerStyles(this.props.layer)} />
    );
  }
}

export default Slice;
