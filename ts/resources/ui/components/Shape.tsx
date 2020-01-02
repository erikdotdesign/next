import React from 'react';
import { createShapeStyles } from '../../utils/layerStyles';

interface ShapeProps {
  layer: any;
  images: any;
  svgs: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const Shape = (props: ShapeProps) => {
  const { layer, svgs } = props;
  const path = svgs[`${layer.id}`];
  return (
    <svg
      className='c-layer c-layer--shape'
      // @ts-ignore
      style={createShapeStyles(layer, svgs)}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}>
      <path d={path} />
    </svg>
  );
}

export default Shape;
