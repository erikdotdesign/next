import React from 'react';
import chroma from 'chroma-js';

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
      className='c-sidebar-left__layer c-sidebar-left__layer--header'
      style={{
        background: `${
          selection && layer.id === selection.id
          ? chroma('#EF2EF2').darken((index + 1) * 0.2)
          : chroma('#333').brighten((index + 1) * 0.2)
        }`
      }}>
      <span className='c-sidebar-left-layer__name'>
        <span style={{paddingLeft: `${(index + 1) * 8}px`}}>
          {layer.name}
        </span>
      </span>
    </div>
  )
};

export default SidebarLeftGroupHead;