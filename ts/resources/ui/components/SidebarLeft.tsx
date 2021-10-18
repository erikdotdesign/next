import React from 'react';
import Sidebar from './Sidebar';
import SidebarLeftGroupHead from './SidebarLeftGroupHead';
import SidebarLeftLayers from './SidebarLeftLayers';
import SidebarLeftGroups from './SidebarLeftGroups';
import SidebarHeader from './SidebarHeader';

interface SidebarLeftProps {
  selection: next.AppLayer | null;
  hover: next.AppLayer | null;
  groupSelection: next.Group | null;
  groupSelectionNest: next.Group[] | null;
  artboard: next.Artboard;
  notes: next.Note[];
  setSelection(selection: next.AppLayer | null): void;
  setHover(hover: next.AppLayer | null): void;
  setGroupSelection(groupSelection: next.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: next.Group[] | null): void;
}

const SidebarLeft = (props: SidebarLeftProps) => {
  const { selection, hover, groupSelection, groupSelectionNest, artboard, notes, setSelection, setHover, setGroupSelection, setGroupSelectionNest } = props;
  return (
    <Sidebar side='left'>
      <SidebarHeader text='Layers' />
        <SidebarLeftGroupHead
          layer={artboard}
          selection={selection}
          hover={hover}
          notes={notes}
          groupSelection={groupSelection}
          setHover={setHover}
          setSelection={setSelection}
          setGroupSelection={setGroupSelection}
          setGroupSelectionNest={setGroupSelectionNest} />
        {
          groupSelection
          ? <SidebarLeftGroups
              selection={selection}
              hover={hover}
              groupSelection={groupSelection}
              groupSelectionNest={groupSelectionNest}
              notes={notes}
              setSelection={setSelection}
              setHover={setHover}
              setGroupSelection={setGroupSelection} />
          : <SidebarLeftLayers
              layers={artboard.layers as next.AppArtboardLayer[]}
              selection={selection}
              hover={hover}
              notes={notes}
              setSelection={setSelection}
              setHover={setHover}
              setGroupSelection={setGroupSelection} />
        }
    </Sidebar>
  )
};

export default SidebarLeft;