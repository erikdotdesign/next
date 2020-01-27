import React from 'react';
import SidebarLeftArtboard from './SidebarLeftArtboard';
import SidebarLeftLayers from './SidebarLeftLayers';
import SidebarLeftGroups from './SidebarLeftGroups';

interface SidebarLeftProps {
  selection: srm.AppLayer | null;
  groupSelection: srm.Group | null;
  groupSelectionNest: srm.Group[] | null;
  artboard: srm.Artboard;
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
}

const SidebarLeft = (props: SidebarLeftProps) => {
  const { selection, groupSelection, groupSelectionNest, artboard, setSelection, setHover, setGroupSelection, setGroupSelectionNest } = props;
  return (
    <div className='c-sidebar c-sidebar--left'>
      <div className='c-sidebar__header'>
        <span>Layers</span>
      </div>
      <SidebarLeftArtboard
        artboard={artboard}
        selection={selection}
        setHover={setHover}
        setSelection={setSelection}
        setGroupSelection={setGroupSelection}
        setGroupSelectionNest={setGroupSelectionNest} />
      {
        groupSelection
        ? <SidebarLeftGroups
            selection={selection}
            groupSelection={groupSelection}
            groupSelectionNest={groupSelectionNest}
            setSelection={setSelection}
            setHover={setHover}
            setGroupSelection={setGroupSelection} />
        : <SidebarLeftLayers
            layers={artboard.layers as srm.AppArtboardLayer[]}
            selection={selection}
            setSelection={setSelection}
            setHover={setHover}
            setGroupSelection={setGroupSelection} />
      }
    </div>
  )
};

export default SidebarLeft;