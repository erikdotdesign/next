import React from 'react';
import LayerSVG from './LayerSVG';
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
  return (
    <div
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      className='c-layer c-layer--shape'
      style={createShapeStyles(props.layer)}>
      <LayerSVG
        layer={layer}
        path={svgs[`${layer.id}`]} />
    </div>
  );
}

export default Shape;
