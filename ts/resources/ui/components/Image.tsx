import React from 'react';
import { createImageStyles } from '../../utils/layerStyles';

interface ImageProps {
  layer: any;
  images: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

class Image extends React.Component<ImageProps, {}> {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        className='c-layer c-layer--image'
        // @ts-ignore
        style={createImageStyles(this.props.layer, this.props.images)} />
    );
  }
}

export default Image;
