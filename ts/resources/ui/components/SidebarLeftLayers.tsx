import React from 'react';
import SidebarLeftLayer from './SidebarLeftLayer';

interface SidebarLeftLayersProps {
  layers: srm.AppArtboardLayer[];
}

const SidebarLeftLayers = (props: SidebarLeftLayersProps) => {
  const { layers } = props;
  return (
    <div className='c-sidebar-left__layers'>
      {
        layers.map((layer: srm.AppArtboardLayer, index: number) => (
          <SidebarLeftLayer
            key={index}
            layer={layer} />
        ))
      }
    </div>
  )
};

export default SidebarLeftLayers;