import React from 'react';
import { createImageStyles } from '../../utils/layerStyles';

interface ImageProps {
  layer: any;
  images: any;
}

class Image extends React.Component<ImageProps, {}> {
  render() {
    return (
      <div
        data-layer-name={this.props.layer.name}
        className='c-layer c-layer--image'
        // @ts-ignore
        style={createImageStyles(this.props.layer, this.props.images)} />
    );
  }
}

export default Image;
