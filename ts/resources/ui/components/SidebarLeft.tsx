import React from 'react';
import SidebarLeftLayers from './SidebarLeftLayers';

interface SidebarLeftProps {
  selection: srm.AppLayer | null;
  artboard: srm.Artboard;
}

const SidebarLeft = (props: SidebarLeftProps) => {
  const { selection, artboard } = props;
  return (
    <div className='c-sidebar c-sidebar--left'>
      <SidebarLeftLayers layers={artboard.layers as srm.AppArtboardLayer[]} />
    </div>
  )
};

export default SidebarLeft;