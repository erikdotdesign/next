import React, { useState, useEffect, useRef } from 'react';
import IconAdd from './IconAdd';

interface SidebarRightInputProps {
  selection: srm.AppLayer | null;
  notes: srm.Notes;
  setNotes(notes: srm.Notes): void;
}

const SidebarRightInput = (props: SidebarRightInputProps) => {
  const [note, setNote] = useState<string>('');
  const input = useRef<HTMLTextAreaElement>(null);
  const { selection, notes, setNotes } = props;
  const handleChange = (e: any) => {
    setNote(e.target.value);
  }
  const handleSubmit = () => {
    if (selection && note.trim().length > 0) {
      let layerNotes = notes[selection.id];
      if (layerNotes) {
        setNotes({
          ...notes,
          [selection.id]: {
            notes: [...layerNotes.notes, note],
            layer: selection
          }
        });
      } else {
        setNotes({
          ...notes,
          [selection.id]: {
            notes: [note],
            layer: selection
          }
        });
      }
      setNote('');
      input.current?.focus();
    }
  }
  return (
    <div className='c-sidebar-right__add-note'>
      <textarea
        className='c-sidebar-right__input'
        ref={input}
        placeholder='Compose note...'
        value={note}
        onChange={handleChange} />
      <button
        className={
          `c-sidebar-right__submit ${
            selection && note.trim().length > 0
            ? 'c-sidebar-right__submit--enabled'
            : null
          }`
        }
        onClick={handleSubmit}>
        <IconAdd />
      </button>
    </div>
  )
};

export default SidebarRightInput;