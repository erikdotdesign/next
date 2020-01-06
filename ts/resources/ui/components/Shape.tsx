import React from 'react';
import ShapeMarkers from './ShapeMarkers';
import { createShapeStyles, createShapeSVGPathStyles } from '../../utils/layerStyles';

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
  const svg = svgs.find((svg: any) => svg.id === layer.id);
  return (
    <svg
      className='c-layer c-layer--shape'
      style={createShapeStyles(layer)}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}>
      <ShapeMarkers layer={layer} />
      <path
        //@ts-ignore
        style={createShapeSVGPathStyles(layer)}
        markerEnd='url(#tail)'
        markerStart='url(#head)'
        d={svg.path} />
    </svg>
  );
}

export default Shape;
