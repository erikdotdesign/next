import React from 'react';
import SidebarLeftLayer from './SidebarLeftLayer';

interface SidebarLeftLayersProps {
  layers: next.AppArtboardLayer[];
  hover: next.AppLayer | null;
  selection: next.AppLayer | null;
  notes: next.Note[];
  setSelection(selection: next.AppLayer | null): void;
  setHover(hover: next.AppLayer | null): void;
  setGroupSelection(groupSelection: next.Group | null): void;
  nestPadding?: number;
}

const SidebarLeftLayers = (props: SidebarLeftLayersProps) => {
  const { layers, selection, hover, notes, setSelection, setHover, setGroupSelection, nestPadding } = props;
  return (
    <div className='c-sidebar-left__layers'>
      {
        layers.map((layer: next.AppArtboardLayer, index: number) => (
          <SidebarLeftLayer
            key={index}
            layer={layer}
            notes={notes}
            nestPadding={nestPadding}
            selection={selection}
            hover={hover}
            setSelection={setSelection}
            setHover={setHover}
            setGroupSelection={setGroupSelection} />
        ))
      }
    </div>
  )
};

export default SidebarLeftLayers;