import React, { useState } from 'react';
import SidebarRightTextArea from './SidebarRightTextArea';
import SidebarRightSubmit from './SidebarRightSubmit';

interface SidebarRightInputProps {
  selection: srm.AppLayer | null;
  notes: srm.Note[];
  setNotes(notes: srm.Note[]): void;
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