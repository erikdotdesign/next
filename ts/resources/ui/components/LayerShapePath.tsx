import React from 'react';
import shapePathStyles from '../styles/shapePathStyles';

interface LayerShapePathProps {
  layer: srm.ShapePath;
  images: srm.ImgAsset[];
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerShapePath = (props: LayerShapePathProps) => {
  return (
    <div
      id={props.layer.id}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      className='c-layer c-layer--shape-path'
      style={shapePathStyles(props.layer, props.images)} />
  )
};

export default LayerShapePath;
