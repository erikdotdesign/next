import React, { useState } from 'react';
import SidebarRightTextArea from './SidebarRightTextArea';
import SidebarRightSubmit from './SidebarRightSubmit';

interface SidebarRightInputProps {
  selection: next.AppLayer | null;
  notes: next.Note[];
  setNotes(notes: next.Note[]): void;
}

const SidebarRightInput = (props: SidebarRightInputProps) => {
  const [note, setNote] = useState<string>('');
  return (
    <div className='c-sidebar-right__add-note'>
      <SidebarRightTextArea
        note={note}
        setNote={setNote} />
      <SidebarRightSubmit
        {...props}
        note={note}
        setNote={setNote} />
    </div>
  )
};

export default SidebarRightInput;