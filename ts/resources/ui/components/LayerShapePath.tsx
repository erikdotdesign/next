import React from 'react';
import LayerShape from './LayerShape';
import LayerShapePathClosed from './LayerShapePathClosed';

interface LayerShapePathProps {
  layer: any;
  svgs: any;
  images: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerShapePath = (props: LayerShapePathProps) => {
  return (
    props.layer.closed
    ? <LayerShapePathClosed {...props} />
    : <LayerShape {...props} />
  )
};

export default LayerShapePath;
