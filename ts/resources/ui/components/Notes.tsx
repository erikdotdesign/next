import React from 'react';
import NoteCount from './NoteCount';

interface NotesProps {
  artboard: srm.Artboard;
  notes: srm.Notes;
  setSelection(selection: srm.AppLayer | null): void;
}

const Notes = (props: NotesProps) => {
  const { artboard, setSelection, notes } = props;
  const getLayer = (id: string) => {
    if (id === artboard.id) {
      return artboard;
    } else {
      return artboard.layers.find((layer: any) => layer.id === id);
    }
  }
  return (
    <div className='c-notes'>
      {
        Object.entries(notes).length > 0
        ? Object.keys(notes).map((note: any, index: number) => (
            <NoteCount
              key={index}
              onClick={() => setSelection(getLayer(note) as srm.AppLayer)}
              position={(getLayer(note) as srm.AppLayer).frame}
              count={notes[note].length} />
          ))
        : null
      }
    </div>
  );
}

export default Notes;