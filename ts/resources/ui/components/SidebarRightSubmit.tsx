import React from 'react';
import IconAdd from './IconAdd';
import ThemeContext from './ThemeContext';
import { getLayerNotes } from '../utils';

interface SidebarRightSubmitProps {
  selection: srm.AppLayer | null;
  note: string;
  notes: srm.Note[];
  setNote(note: string): void;
  setNotes(notes: srm.Note[]): void;
}

const SidebarRightSubmit = (props: SidebarRightSubmitProps) => {
  const { selection, note, notes, setNote, setNotes } = props;
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
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarRightSubmit;