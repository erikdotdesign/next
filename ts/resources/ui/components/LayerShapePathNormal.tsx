import React from 'react';
import shapePathStyles from '../styles/shapePathStyles';

interface LayerShapePathNormalProps {
  layer: srm.ShapePath;
  svgs: srm.SvgPath[];
  images: srm.Base64Image[];
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerShapePathNormal = (props: LayerShapePathNormalProps) => (
  <div
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    className='c-layer c-layer--shape-path'
    style={shapePathStyles(props.layer, props.images)} />
);

export default LayerShapePathNormal;
