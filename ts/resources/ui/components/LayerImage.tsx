import React from 'react';
import imageStyles from '../styles/imageStyles';

interface LayerImageProps {
  layer: any;
  images: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerImage = (props: LayerImageProps) => (
  <div
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    className='c-layer c-layer--image'
    style={imageStyles(props.layer, props.images)} />
);

export default LayerImage;
