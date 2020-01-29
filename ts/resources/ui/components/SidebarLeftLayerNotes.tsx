import React from 'react';

interface SidebarLeftLayerNotesProps {
  notes: srm.Note | undefined;
}

const SidebarLeftLayerNotes = (props: SidebarLeftLayerNotesProps) => {
  const { notes } = props;
  return (
    notes
    ? <span className='c-sidebar-left-layer__note-count'>
        { notes.notes.length }
      </span>
    : null
  )
};

export default SidebarLeftLayerNotes;