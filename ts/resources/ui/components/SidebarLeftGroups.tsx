import React, { useEffect, useState } from 'react';
import SidebarLeftGroupHead from './SidebarLeftGroupHead';
import SidebarLeftLayers from './SidebarLeftLayers';

interface SidebarLeftGroupsProps {
  selection: srm.AppLayer | null;
  groupSelection: srm.Group;
  groupSelectionNest: srm.Group[] | null;
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
}

const SidebarLeftGroups = (props: SidebarLeftGroupsProps) => {
  const { selection, groupSelection, groupSelectionNest, setSelection, setHover, setGroupSelection, setGroupSelectionNest } = props;
  const [nestPadding, setNestPadding] = useState<number>(0);
  const updateNestPadding = () => {
    if (groupSelectionNest) {
      const groupSelectionIndex = groupSelectionNest.findIndex((group: srm.Group) => group.id === groupSelection.id);
      setNestPadding(((groupSelectionIndex + 1) * 8) + 8);
    } else {
      setNestPadding(16);
    }
  }
  const updateGroupSelectionNest = () => {
    if (groupSelectionNest) {
      const nestContainsGroup = groupSelectionNest?.find((group: srm.Group) => group.id === groupSelection.id);
      if (nestContainsGroup) {
        let i = 0;
        let newNest = [];
        while (groupSelectionNest[i].id !== groupSelection.id) {
          newNest.push(groupSelectionNest[i]);
          i++;
        }
        setGroupSelectionNest([...newNest, groupSelection]);
      } else {
        setGroupSelectionNest([...groupSelectionNest, groupSelection]);
      }
    } else {
      setGroupSelectionNest([groupSelection]);
    }
  }
  useEffect(() => {
    updateGroupSelectionNest();
  }, [groupSelection]);
  useEffect(() => {
    updateNestPadding();
  }, [groupSelectionNest]);
  return (
    <div className='c-sidebar c-sidebar--left'>
      {
        groupSelectionNest
        ? groupSelectionNest.map((group: srm.Group, index: number) => (
            <SidebarLeftGroupHead
              key={index}
              layer={group}
              index={index}
              groupSelection={groupSelection}
              selection={selection}
              setSelection={setSelection}
              setHover={setHover}
              setGroupSelection={setGroupSelection} />
          ))
        : null
      }
      <SidebarLeftLayers
        layers={groupSelection.layers as srm.AppArtboardLayer[]}
        nestPadding={nestPadding}
        selection={selection}
        setSelection={setSelection}
        setHover={setHover}
        setGroupSelection={setGroupSelection} />
    </div>
  )
};

export default SidebarLeftGroups;