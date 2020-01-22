import React from 'react';
import SidebarLeftLayers from './SidebarLeftLayers';

interface SidebarLeftProps {
  selection: srm.AppLayer | null;
  setSelection(selection: srm.AppLayer | null): void;
  artboard: srm.Artboard;
}

const SidebarLeft = (props: SidebarLeftProps) => {
  const { selection, artboard, setSelection } = props;
  return (
    <div className='c-sidebar c-sidebar--left'>
      <SidebarLeftLayers
        layers={artboard.layers as srm.AppArtboardLayer[]}
        selection={selection}
        setSelection={setSelection} />
    </div>
  )
};

export default SidebarLeft;