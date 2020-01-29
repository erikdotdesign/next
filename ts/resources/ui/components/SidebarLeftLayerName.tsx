import React from 'react';

interface SidebarLeftLayerNameProps {
  name: string;
  style?: any;
}

const SidebarLeftLayerName = (props: SidebarLeftLayerNameProps) => {
  return (
    <span className='c-sidebar-left-layer__name'>
      <span style={{...props.style}}>
        {props.name}
      </span>
    </span>
  )
};

export default SidebarLeftLayerName;