import React from 'react';
import shapePathStyles from '../styles/shapePathStyles';

interface LayerShapePathNormalProps {
  layer: srm.ShapePath;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerShapePathNormal = (props: LayerShapePathNormalProps) => (
  <div
    id={props.layer.id}
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    className='c-layer c-layer--shape-path'
    style={shapePathStyles(props.layer, props.images, props.svgs)} />
);

export default LayerShapePathNormal;
