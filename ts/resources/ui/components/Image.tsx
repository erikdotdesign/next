import React from 'react';
import imageStyles from '../styles/imageStyles';
//import { createImageStyles } from '../../utils/layerStyles';

interface ImageProps {
  layer: any;
  images: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const Image = (props: ImageProps) => (
  <div
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    className='c-layer c-layer--image'
    style={imageStyles(props.layer, props.images)} />
);

export default Image;
