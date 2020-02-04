import React from 'react';
import ThemeContext from './ThemeContext';

interface SidebarLeftLayerNotesNestedProps {
  nestedNotes: number;
}

const SidebarLeftLayerNotesNested = (props: SidebarLeftLayerNotesNestedProps) => {
  const { nestedNotes } = props;
  return (
    nestedNotes && nestedNotes > 0
    ? <ThemeContext.Consumer>
        {(theme) => (
          <span
            className='c-sidebar-left-layer__nested-note-count'
            style={{
              background: theme.palette.accent,
              color: theme.text.onAccent
            }}>
            { nestedNotes }
          </span>
        )}
      </ThemeContext.Consumer>
    : null
  )
};

export default SidebarLeftLayerNotesNested;