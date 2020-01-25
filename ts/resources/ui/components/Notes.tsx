import React from 'react';
import NoteCount from './NoteCount';
import { getAbsolutePosition } from '../utils';

interface NotesProps {
  artboard: srm.Artboard;
  notes: srm.Notes;
  setSelection(selection: srm.AppLayer | null): void;
}

const Notes = (props: NotesProps) => {
  const { artboard, setSelection, notes } = props;
  const getLayerPosition = (layer: srm.AppLayer) => {
    const absolutePosition = getAbsolutePosition(artboard.id, layer.id);
    const position = {
      width: layer.frame.width,
      height: layer.frame.height,
      ...absolutePosition
    };
    return position;
  }
  return (
    <div className='c-notes'>
      {
        Object.entries(notes).length > 0
        ? Object.keys(notes).map((note: any, index: number) => (
            <NoteCount
              key={index}
              onClick={() => setSelection(notes[note].layer)}
              position={(getLayerPosition(notes[note].layer) as srm.Rectangle)}
              count={notes[note].notes.length} />
          ))
        : null
      }
    </div>
  );
}

export default Notes;