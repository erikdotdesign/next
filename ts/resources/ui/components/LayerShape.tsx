import React, {useEffect, useRef} from 'react';
import shapeStyles from '../styles/shapeStyles';

interface LayerShapeProps {
  layer: any;
  images: any;
  svgs: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerShape = (props: LayerShapeProps) => {
  const { layer, svgs } = props;
  const shape = useRef<HTMLDivElement>(null);
  const svg = svgs.find((svg: any) => svg.id === layer.id);
  useEffect(() => {
    if (shape.current) {
      shape.current.innerHTML = svg.svg;
    }
  }, []);
  return (
    <div
      className='c-layer c-layer--shape'
      ref={shape}
      style={shapeStyles(layer)}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut} />
  );
}

export default LayerShape;