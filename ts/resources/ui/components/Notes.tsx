import React from 'react';
import NoteCount from './NoteCount';

interface NotesProps {
  artboard: any;
  setSelection: any;
  notes: any;
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
        Object.keys(notes).map((note: any, index: number) => (
          <NoteCount
            key={index}
            onClick={() => setSelection(getLayer(note))}
            position={getLayer(note).frame}
            count={notes[note].length} />
        ))
      }
    </div>
  );
}

export default Notes;