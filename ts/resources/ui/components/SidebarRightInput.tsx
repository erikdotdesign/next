import React, { useState, useRef } from 'react';
import IconAdd from './IconAdd';

interface SidebarRightInputProps {
  selection: srm.AppLayer | null;
  notes: srm.Note[];
  setNotes(notes: srm.Note[]): void;
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
      const selectionHasNotes = notes.some((layer: srm.Note) => {
        return layer.id === selection.id;
      });
      if (selectionHasNotes) {
        let newNotes = notes.map((layerNotes: any) => {
          if (layerNotes.id === selection.id) {
            layerNotes.notes.push(note);
          }
          return layerNotes;
        });
        setNotes(newNotes);
      } else {
        const newNote = {
          id: selection.id,
          notes: [note]
        }
        setNotes([...notes, newNote]);
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