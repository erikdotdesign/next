import React from 'react';
import LayerShapePathNormal from './LayerShapePathNormal';
import LayerShape from './LayerShape';

interface LayerShapePathClosedProps {
  layer: srm.ShapePath;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerShapePathClosed = (props: LayerShapePathClosedProps) => {
  switch(props.layer.shapeType) {
    case 'Rectangle':
    case 'Oval':
      return (
        <LayerShapePathNormal {...props} />
      )
    case 'Triangle':
    case 'Polygon':
    case 'Star':
    case 'Custom':
      return  (
        <LayerShape {...props} />
      )
    default:
      return (
        <LayerShapePathNormal {...props} />
      )
  }
};

export default LayerShapePathClosed;
