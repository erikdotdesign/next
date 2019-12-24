import React from 'react';
import { createBaseLayerStyles } from '../../utils/layerStyles';

interface ImageProps {
  layer: any;
}

class Image extends React.Component<ImageProps, {}> {
  render() {
    return (
      <div
        className='c-layer c-layer--image'
        // @ts-ignore
        style={createBaseLayerStyles(this.props.layer)} />
    );
  }
}

export default Image;
