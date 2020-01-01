import React from 'react';
import { createShapePathStyles } from '../../utils/layerStyles';

interface ShapePathProps {
  layer: any;
  images: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const ShapePath = (props: ShapePathProps) => (
  <div
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    className='c-layer c-layer--shape-path'
    style={createShapePathStyles(props.layer, props.images)}>
  </div>
);

export default ShapePath;
