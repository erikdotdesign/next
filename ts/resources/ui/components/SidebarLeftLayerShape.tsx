import React from 'react';
import IconShape from './IconShape';

interface SidebarLeftLayerShapeProps {
  layer: srm.Shape;
}

const SidebarLeftLayerShape = (props: SidebarLeftLayerShapeProps) => {
  const { layer } = props;
  return (
    <div className='c-sidebar-left__layer'>
      <div className='c-sidebar-left-layer__icon'>
        <IconShape />
      </div>
      <span className='c-sidebar-left-layer__name'>
        {layer.name}
      </span>
    </div>
  )
};

export default SidebarLeftLayerShape;