import React from 'react';
import IconText from './IconText';

interface SidebarLeftLayerTextProps {
  layer: srm.Text;
}

const SidebarLeftLayerText = (props: SidebarLeftLayerTextProps) => {
  const { layer } = props;
  return (
    <div className='c-sidebar-left__layer'>
      <div className='c-sidebar-left-layer__icon'>
        <IconText />
      </div>
      <span className='c-sidebar-left-layer__name'>
        {layer.name}
      </span>
    </div>
  )
};

export default SidebarLeftLayerText;