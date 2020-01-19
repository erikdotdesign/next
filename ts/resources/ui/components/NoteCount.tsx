import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';

interface NoteCountProps {
  position: any;
  count: number;
  onClick: any;
}

const NoteCount = (props: NoteCountProps) => {
  const noteCount = useRef<HTMLButtonElement>(null);
  const { position, count, onClick } = props;
  useEffect(() => {
    gsap.timeline()
        .to(noteCount.current, {scale: 1, duration: 0.15})
        .to(noteCount.current, {y: -10, duration: 0.10}, `-=0.10`)
        .to(noteCount.current, {y: -2, duration: 0.10})
        .to(noteCount.current, {y: -5, duration: 0.10})
        .to(noteCount.current, {y: 0, duration: 0.10});
  }, [count]);
  return (
    <button
      ref={noteCount}
      className='c-note-count'
      onClick={onClick}
      style={{
        left: position.x + position.width,
        top: position.y
      }}>
      {count}
    </button>
  );
}

export default NoteCount;
