import React from 'react';

interface SidebarLeftLayerNameProps {
  name: string;
  paddingLeft: number;
  color: string;
}

const SidebarLeftLayerName = (props: SidebarLeftLayerNameProps) => {
  const { paddingLeft, name, color } = props;
  return (
    <div
      className='c-sidebar-left-layer__name'
      style={{color}}>
      <span style={{paddingLeft}}>
        {name}
      </span>
    </div>
  )
};

export default SidebarLeftLayerName;