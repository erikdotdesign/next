import React, { useState } from 'react';
import SidebarLeftLayers from './SidebarLeftLayers';
import IconTriRight from './IconTriRight';
import IconTriDown from './IconTriDown';
import IconFolderClosed from './IconFolderClosed';
import IconFolderOpen from './IconFolderOpen';

interface SidebarLeftGroupHeadProps {
  layer: srm.Group;
  index: number;
  selection: srm.AppLayer | null;
  groupSelection: srm.Group;
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
}

const SidebarLeftGroupHead = (props: SidebarLeftGroupHeadProps) => {
  const { layer, index, selection, groupSelection, setSelection, setHover, setGroupSelection } = props;
  return (
    <div
      onClick={() => setSelection(layer)}
      onDoubleClick={() => setGroupSelection(layer)}
      onMouseOver={() => setHover(layer)}
      onMouseOut={() => setHover(null)}
      className={ `c-sidebar-left__layer c-sidebar-left__layer--header ${
        selection && layer.id === selection.id
        ? 'c-sidebar-left__layer--active'
        : null
      } ${
        selection && layer.id === groupSelection.id
        ? 'c-sidebar-left__layer--header-active'
        : null
      }`}>
      <span className='c-sidebar-left-layer__name'>
        <span style={{paddingLeft: `${(index + 1) * 8}px`}}>
          {layer.name}
        </span>
      </span>
    </div>
  )
};

export default SidebarLeftGroupHead;