import React from 'react';

interface SidebarLeftLayerNotesNestedProps {
  nestedNotes: number;
}

const SidebarLeftLayerNotesNested = (props: SidebarLeftLayerNotesNestedProps) => {
  const { nestedNotes } = props;
  return (
    nestedNotes && nestedNotes > 0
    ? <span className='c-sidebar-left-layer__nested-note-count'>
        { nestedNotes }
      </span>
    : null
  )
};

export default SidebarLeftLayerNotesNested;