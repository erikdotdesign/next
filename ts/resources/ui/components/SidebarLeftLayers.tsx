import React from 'react';
import SidebarLeftLayer from './SidebarLeftLayer';

interface SidebarLeftLayersProps {
  layers: srm.AppArtboardLayer[];
  selection: srm.AppLayer | null;
  setSelection(selection: srm.AppLayer | null): void;
}

const SidebarLeftLayers = (props: SidebarLeftLayersProps) => {
  const { layers, selection, setSelection } = props;
  return (
    <div className='c-sidebar-left__layers'>
      {
        layers.map((layer: srm.AppArtboardLayer, index: number) => (
          <SidebarLeftLayer
            key={index}
            layer={layer}
            selection={selection}
            setSelection={setSelection} />
        ))
      }
    </div>
  )
};

export default SidebarLeftLayers;