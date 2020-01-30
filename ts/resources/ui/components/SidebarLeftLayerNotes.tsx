import React from 'react';
import ThemeContext from './ThemeContext';

interface SidebarLeftLayerNotesProps {
  notes: srm.Note | undefined;
}

const SidebarLeftLayerNotes = (props: SidebarLeftLayerNotesProps) => {
  const { notes } = props;
  return (
    notes
    ? <ThemeContext.Consumer>
        {(theme) => (
          <span
            className='c-sidebar-left-layer__note-count'
            style={{
              color: theme.text.onPrimary,
              background: theme.palette.primary
            }}>
            { notes.notes.length }
          </span>
        )}
      </ThemeContext.Consumer>
    : null
  )
};

export default SidebarLeftLayerNotes;