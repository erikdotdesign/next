import React from 'react';
import imageStyles from '../styles/imageStyles';

interface LayerImageProps {
  layer: next.Image;
  images: next.ImgAsset[];
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerImage = (props: LayerImageProps) => (
  <div
    id={props.layer.id}
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    className='c-layer c-layer--image'
    style={imageStyles(props.layer, props.images)} />
);

export default LayerImage;
