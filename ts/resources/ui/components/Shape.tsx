import React from 'react';
import {
  createShapeStyles,
  createShapeSVGPathStyles,
  createShapeSVGMarkerShape,
  createShapeSVGMarkerStyles
 } from '../../utils/layerStyles';

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
  const endArrowhead = layer.style.borderOptions.endArrowhead;
  const startArrowhead = layer.style.borderOptions.startArrowhead;
  const openArrowEnd = layer.style.borderOptions.endArrowhead === 'OpenArrow';
  const openArrowStart = layer.style.borderOptions.startArrowhead === 'OpenArrow';
  return (
    <svg
      className='c-layer c-layer--shape'
      style={createShapeStyles(layer)}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}>
      <defs>
        <marker
          id='head'
          orient='auto-start-reverse'
          markerWidth='5'
          markerHeight='5'
          refX={`${openArrowStart ? 3 : 0}`}
          refY='2.5'>
          <path
            style={createShapeSVGMarkerStyles(layer, startArrowhead)}
            d={`${createShapeSVGMarkerShape(startArrowhead)}`} />
        </marker>
        <marker
          id='tail'
          orient='auto'
          markerWidth='5'
          markerHeight='5'
          refX={`${openArrowEnd ? 3 : 0}`}
          refY='2.5'>
          <path
            style={createShapeSVGMarkerStyles(layer, endArrowhead)}
            d={`${createShapeSVGMarkerShape(endArrowhead)}`} />
        </marker>
      </defs>
      <path
        //@ts-ignore
        style={createShapeSVGPathStyles(layer)}
        markerEnd='url(#tail)'
        markerStart='url(#head)'
        d={path} />
    </svg>
  );
}

export default Shape;
