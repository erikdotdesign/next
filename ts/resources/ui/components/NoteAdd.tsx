import React, { useState } from 'react';
import NoteCompose from './NoteCompose';
import IconAddNote from './IconAddNote';

interface NoteAddProps {
  layer: srm.AppLayer;
  notes: srm.Notes;
  zoom: number;
  setNotes(notes: srm.Notes): void;
}

const NoteAdd = (props: NoteAddProps) => {
  const [composeNote, setComposeNote] = useState<boolean>(false);
  const { layer, notes, setNotes, zoom } = props;
  return (
    <div className='c-note-add'>
      {
        composeNote
        ? <NoteCompose
            layer={layer}
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
          left: layer.frame.x,
          top: layer.frame.y
        }}>
        <IconAddNote />
      </button>
    </div>
  );
}

export default NoteAdd;