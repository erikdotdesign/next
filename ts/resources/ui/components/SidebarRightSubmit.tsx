import React, { useState } from 'react';
import IconAdd from './IconAdd';
import ThemeContext from './ThemeContext';
import { getLayerNotes } from '../utils';

interface SidebarRightSubmitProps {
  selection: next.AppLayer | null;
  note: string;
  notes: next.Note[];
  setNote(note: string): void;
  setNotes(notes: next.Note[]): void;
}

const SidebarRightSubmit = (props: SidebarRightSubmitProps) => {
  const [hovering, setHovering] = useState(false);
  const { selection, note, notes, setNote, setNotes } = props;
  const noteValid = selection && note.trim().length > 0;
  const handleSubmit = () => {
    if (selection && note.trim().length > 0) {
      const selectionNotes = getLayerNotes(selection.id, notes);
      if (selectionNotes) {
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
    }
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          onClick={handleSubmit}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{background: theme.background.z1}}
          className={
            `c-sidebar-right__submit ${
              noteValid
              ? 'c-sidebar-right__submit--enabled'
              : null
            }`
          }>
          <IconAdd
            style={{
              fill:
              noteValid
              ? theme.text.onPrimary
              : theme.text.base
            }} />
          {
            noteValid
            ? <div
                className='c-sidebar-right__submit-bg'
                style={{
                  background:
                  hovering
                  ? theme.palette.primaryHover
                  : theme.palette.primary
                }} />
            : null
          }
        </button>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarRightSubmit;