import React, { useState } from 'react';
import NoteCompose from './NoteCompose';
import IconAddNote from './IconAddNote';
import { getAbsolutePosition } from '../utils';

interface NoteAddProps {
  layer: srm.AppLayer;
  artboard: srm.Artboard;
  notes: srm.Notes;
  zoom: number;
  setNotes(notes: srm.Notes): void;
}

const NoteAdd = (props: NoteAddProps) => {
  const [composeNote, setComposeNote] = useState<boolean>(false);
  const { layer, artboard, notes, setNotes, zoom } = props;
  const absolutePosition = getAbsolutePosition(artboard.id, layer.id);
  return (
    <div className='c-note-add'>
      {
        composeNote
        ? <NoteCompose
            layer={layer}
            absolutePosition={absolutePosition}
            setComposeNote={setComposeNote}
            notes={notes}
            setNotes={setNotes}
            zoom={zoom} />
        : null
      }
      <button
        className={`c-note-add__compose ${
          composeNote
          ? 'c-note-add__compose--disabled'
          : null
        }`}
        onClick={() => setComposeNote(true)}
        style={{
          left: absolutePosition.x,
          top: absolutePosition.y
        }}>
        <IconAddNote />
      </button>
    </div>
  );
}

export default NoteAdd;