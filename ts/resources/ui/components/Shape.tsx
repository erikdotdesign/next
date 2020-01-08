import React from 'react';
import ShapeMarkers from './ShapeMarkers';
import shapeStyles from '../styles/shapeStyles';
import pathStyles from '../styles/pathStyles';

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
      style={shapeStyles(layer)}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}>
      <ShapeMarkers layer={layer} />
      <path
        style={pathStyles(layer, svgs)}
        markerEnd='url(#tail)'
        markerStart='url(#head)'
        d={svg.path} />
    </svg>
  );
}

export default Shape;
