import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import IconClose from './IconClose';
import IconAdd from './IconAdd';

interface NoteComposeProps {
  layer: srm.AppLayer;
  notes: srm.Notes;
  zoom: number;
  absolutePosition: {x: number, y: number};
  setNotes(notes: srm.Notes): void;
  setComposeNote(composeNote: boolean): void;
}

const NoteCompose = (props: NoteComposeProps) => {
  const [note, setNote] = useState<string>('');
  const modal = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
  const compose = useRef<HTMLTextAreaElement>(null);
  const composeBorder = useRef<HTMLDivElement>(null);
  const { layer, setComposeNote, notes, setNotes, zoom, absolutePosition } = props;
  const handleChange = (e: any) => {
    setNote(e.target.value);
  }
  const handleSubmit = () => {
    if (note.trim().length > 0) {
      let layerNotes = notes[layer.id];
      if (layerNotes) {
        setNotes({
          ...notes,
          [layer.id]: {
            notes: [...layerNotes.notes, note],
            layer: layer
          }
        });
      } else {
        setNotes({
          ...notes,
          [layer.id]: {
            notes: [note],
            layer: layer
          }
        });
      }
      setComposeNote(false);
    }
  }
  const handleFocus = () => {
    gsap.timeline()
        .to(composeBorder.current, {scaleX: 1, duration: 0.25})
        .to(compose.current, {background: '#222', duration: 0.15}, `-=0.1`);
  }
  const handleBlur = () => {
    gsap.to(composeBorder.current, {scaleX: 0, duration: 0.25});
  }
  useEffect(() => {
    gsap.timeline({
          onComplete: () => compose.current?.focus()
        })
        .set(modal.current, {scale: 0})
        .to(modal.current, {scale: zoom < 1 ? 1 / zoom : 1, duration: 0.15})
        .to(modalContent.current, {opacity: 1, duration: 0.15, delay: 0.05});
  }, []);
  useEffect(() => {
    gsap.set(modal.current, {scale: zoom < 1 ? 1 / zoom : 1});
  }, [props.zoom]);
  return (
    <div className='c-note-compose'>
      <div
        className='c-compose'
        ref={modal}
        style={{
          left: absolutePosition.x + layer.frame.width / 2,
          top: absolutePosition.y + layer.frame.height
        }}>
        <div className='c-compose__content' ref={modalContent}>
          <div className='c-compose__header'>
            <h3 className='c-compose__title'>New note</h3>
            <button
              className='c-compose__close'
              onClick={() => setComposeNote(false)}>
              <IconClose />
            </button>
          </div>
          <div className='c-compose__body'>
            <textarea
              className='c-compose__input'
              ref={compose}
              placeholder='Compose note...'
              value={note}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur} />
            <div ref={composeBorder} className='c-compose__input-bb' />
          </div>
          <div className='c-compose__footer'>
            <button
              className={
                `c-compose__submit ${
                  note.trim().length > 0
                  ? 'c-compose__submit--enabled'
                  : null
                }`
              }
              onClick={handleSubmit}>
              <IconAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCompose;
