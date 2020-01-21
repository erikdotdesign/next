import React from 'react';
import IconImage from './IconImage';

interface SidebarLeftLayerImageProps {
  layer: srm.Image;
}

const SidebarLeftLayerImage = (props: SidebarLeftLayerImageProps) => {
  const { layer } = props;
  return (
    <div className='c-sidebar-left__layer'>
      <div className='c-sidebar-left-layer__icon'>
        <IconImage />
      </div>
      <span className='c-sidebar-left-layer__name'>
        {layer.name}
      </span>
    </div>
  )
};

export default SidebarLeftLayerImage;