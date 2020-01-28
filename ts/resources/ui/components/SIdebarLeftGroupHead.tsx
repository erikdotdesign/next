import React from 'react';
import chroma from 'chroma-js';
import { getLayerNotes } from '../utils';

interface SidebarLeftGroupHeadProps {
  layer: srm.Group;
  index: number;
  selection: srm.AppLayer | null;
  groupSelection: srm.Group;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
}

const SidebarLeftGroupHead = (props: SidebarLeftGroupHeadProps) => {
  const { layer, index, selection, groupSelection, notes, setSelection, setHover, setGroupSelection } = props;
  const isActiveGroup = layer.id === groupSelection.id;
  const layerNotes = isActiveGroup ? getLayerNotes(groupSelection.id, notes) : null;
  const isActiveSelection = selection && layer.id === selection.id;
  return (
    <div
      onClick={() => setSelection(layer)}
      onDoubleClick={() => setGroupSelection(layer)}
      onMouseOver={() => setHover(layer)}
      onMouseOut={() => setHover(null)}
      className='c-sidebar-left__layer c-sidebar-left__layer--header'
      style={{
        background: `${
          isActiveSelection
          ? chroma('#EF2EF2').darken((index + 1) * 0.2)
          : chroma('#333').brighten((index + 1) * 0.2)
        }`
      }}>
      <span className='c-sidebar-left-layer__name'>
        <span style={{paddingLeft: `${(index + 1) * 8}px`}}>
          {layer.name}
        </span>
      </span>
      {
        layerNotes
        ? <span className='c-sidebar-left-layer__note-count'>
            { layerNotes.notes.length }
          </span>
        : null
      }
    </div>
  )
};

export default SidebarLeftGroupHead;