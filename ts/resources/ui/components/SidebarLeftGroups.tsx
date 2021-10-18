import React, { useEffect, useState } from 'react';
import SidebarLeftGroupHead from './SidebarLeftGroupHead';
import SidebarLeftLayers from './SidebarLeftLayers';

interface SidebarLeftGroupsProps {
  selection: next.AppLayer | null;
  hover: next.AppLayer | null;
  groupSelection: next.Group;
  groupSelectionNest: next.Group[] | null;
  notes: next.Note[];
  setSelection(selection: next.AppLayer | null): void;
  setHover(hover: next.AppLayer | null): void;
  setGroupSelection(groupSelection: next.Group | null): void;
}

const SidebarLeftGroups = (props: SidebarLeftGroupsProps) => {
  const { selection, hover, groupSelection, groupSelectionNest, notes, setSelection, setHover, setGroupSelection } = props;
  const [nestPadding, setNestPadding] = useState<number>(0);
  useEffect(() => {
    if (groupSelectionNest) {
      const groupSelectionIndex = groupSelectionNest.findIndex((group: next.Group) => {
        return group.id === groupSelection.id;
      });
      setNestPadding(((groupSelectionIndex + 1) * 8) + 8);
    } else {
      setNestPadding(16);
    }
  }, [groupSelectionNest]);
  return (
    <div className='c-sidebar c-sidebar--left'>
      {
        groupSelectionNest
        ? groupSelectionNest.map((group: next.Group, index: number) => (
            <SidebarLeftGroupHead
              key={index}
              layer={group}
              index={index}
              selection={selection}
              hover={hover}
              groupSelection={groupSelection}
              notes={notes}
              setSelection={setSelection}
              setHover={setHover}
              setGroupSelection={setGroupSelection} />
          ))
        : null
      }
      <SidebarLeftLayers
        layers={groupSelection.layers as next.AppArtboardLayer[]}
        nestPadding={nestPadding}
        selection={selection}
        hover={hover}
        notes={notes}
        setSelection={setSelection}
        setHover={setHover}
        setGroupSelection={setGroupSelection} />
    </div>
  )
};

export default SidebarLeftGroups;