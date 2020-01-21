import React from 'react';
import IconShapePathRectangle from './IconShapePathRectangle';
import IconShapePathOval from './IconShapePathOval';
import IconShapePathTriangle from './IconShapePathTriangle';
import IconShapePathPolygon from './IconShapePathPolygon';
import IconShapePathStar from './IconShapePathStar';
import IconShapePathCustom from './IconShapePathCustom';

interface SidebarLeftLayerShapePathProps {
  layer: srm.ShapePath;
}

interface ShapePathIconProps {
  shapeType: string;
}

const ShapePathIcon = (props: ShapePathIconProps) => {
  switch(props.shapeType) {
    case 'Rectangle':
      return <IconShapePathRectangle />
    case 'Oval':
      return <IconShapePathOval />
    case 'Triangle':
      return <IconShapePathTriangle />
    case 'Polygon':
      return <IconShapePathPolygon />
    case 'Star':
      return <IconShapePathStar />
    case 'Custom':
      return <IconShapePathCustom />
    default:
      return <IconShapePathRectangle />
  }
}

const SidebarLeftLayerShapePath = (props: SidebarLeftLayerShapePathProps) => {
  const { layer } = props;
  return (
    <div className='c-sidebar-left__layer'>
      <div className='c-sidebar-left-layer__icon'>
        <ShapePathIcon shapeType={layer.shapeType}  />
      </div>
      <span className='c-sidebar-left-layer__name'>
        {layer.name}
      </span>
    </div>
  )
};

export default SidebarLeftLayerShapePath;