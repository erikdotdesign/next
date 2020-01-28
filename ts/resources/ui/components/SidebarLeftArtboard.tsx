import React from 'react';
import { getLayerNotes } from '../utils';

interface SidebarLeftArtboardProps {
  artboard: srm.Artboard;
  selection: srm.AppLayer | null;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
}

const SidebarLeftArtboard = (props: SidebarLeftArtboardProps) => {
  const { artboard, selection, notes, setSelection, setGroupSelection, setGroupSelectionNest, setHover } = props;
  const handleDoubleClick = () => {
    setGroupSelection(null);
    setGroupSelectionNest(null);
  }
  const artboardNotes = getLayerNotes(artboard.id, notes);
  return (
    <div
      className={ `c-sidebar-left__layer c-sidebar-left__layer--header ${
        selection && artboard.id === selection.id
        ? 'c-sidebar-left__layer--active'
        : null
      }`}
      onClick={() => setSelection(artboard)}
      onDoubleClick={handleDoubleClick}
      onMouseOver={() => setHover(artboard)}
      onMouseOut={() => setHover(null)}>
      <span className='c-sidebar-left-layer__name'>
        {artboard.name}
      </span>
      {
        artboardNotes
        ? <span className='c-sidebar-left-layer__note-count'>
            { artboardNotes.notes.length }
          </span>
        : null
      }
    </div>
  )
};

export default SidebarLeftArtboard;