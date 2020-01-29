import React from 'react';
import SidebarLeftLayerName from './SidebarLeftLayerName';
import SidebarLeftLayerNotes from './SidebarLeftLayerNotes';
import SidebarLeftLayerNotesNested from './SidebarLeftLayerNotesNested';
import IconTriRight from './IconTriRight';
import { getLayerNotes, getNestedNoteCount } from '../utils';

interface SidebarLeftGroupProps {
  layer: srm.AppLayer;
  selection: srm.AppLayer | null;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  nestPadding?: number;
}

const SidebarLeftGroup = (props: SidebarLeftGroupProps) => {
  const { layer, selection, notes, setHover, setSelection, setGroupSelection, nestPadding } = props;
  const layerNotes = getLayerNotes(layer.id, notes);
  const nestedNotes = getNestedNoteCount(layer, notes);
  return (
    <div className={ `c-sidebar-left__layer c-sidebar-left__layer--group ${
      selection && layer.id === selection.id
      ? 'c-sidebar-left__layer--active'
      : null
    }`}>
      <SidebarLeftLayerName
        name={layer.name}
        style={{paddingLeft: `${nestPadding}px`}} />
      <SidebarLeftLayerNotesNested
        nestedNotes={nestedNotes} />
      <SidebarLeftLayerNotes
        notes={layerNotes} />
      <span className='c-sidebar-left-layer__icon'>
        <IconTriRight />
      </span>
      <div
        className='c-sidebar-left__group-click'
        onClick={() => setSelection(layer)}
        onDoubleClick={() => setGroupSelection(layer as srm.Group)}
        onMouseOver={() => setHover(layer)}
        onMouseOut={() => setHover(null)} />
    </div>
  )
};

export default SidebarLeftGroup;