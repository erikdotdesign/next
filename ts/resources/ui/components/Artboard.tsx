import React, { useEffect, useRef }  from 'react';
import Layers from './Layers';
import gsap from 'gsap';
import Selection from './Selection';
import Hover from './Hover';
import Notes from './Notes';
import NoteAdd from './NoteAdd';
import artboardStyles from '../styles/artboardStyles';

interface ArtboardProps {
  artboard: any;
  images: any;
  svgs: any;
  selection: any;
  setSelection: any;
  hover: any;
  setHover: any;
  zoom: any;
  showNotes: boolean;
  edit: boolean;
  setEdit: any;
  notes: any;
  setNotes: any;
}

const Artboard = (props: ArtboardProps) => {
  const artboardRef = useRef<HTMLDivElement>(null);
  const { artboard, images, svgs, selection, setSelection, hover, setHover, zoom, showNotes, edit, setEdit, notes, setNotes } = props;
  const onClick = () => {
    setSelection(props.artboard);
  }
  const onMouseOver = () => {
    setHover(props.artboard);
  }
  useEffect(() => {
    gsap.set(artboardRef.current, {scale: props.zoom});
  }, [props.zoom]);
  return (
    <div
      className='c-artboard'
      ref={artboardRef}
      style={artboardStyles(artboard)}>
      <Layers
        layers={artboard.layers}
        images={images}
        svgs={svgs}
        setSelection={setSelection}
        setHover={setHover}
        style={{
          width: `${artboard.frame.width}px`,
          height: `${artboard.frame.height}px`
        }} />
      {
        selection
        ? <Selection
            selection={selection}
            hover={hover}
            artboard={artboard}
            zoom={zoom} />
        : null
      }
      {
        hover
        ? <Hover
            hover={hover}
            selection={selection}
            artboard={artboard}
            zoom={zoom} />
        : null
      }
      {
        selection && edit
        ? <NoteAdd
            layer={selection}
            notes={notes}
            setNotes={setNotes}
            zoom={zoom} />
        : null
      }
      {
        showNotes
        ? <Notes
            setSelection={setSelection}
            artboard={artboard}
            notes={notes} />
        : null
      }
      <div
        className='c-artboard__click-area'
        onClick={onClick}
        onMouseOver={onMouseOver} />
    </div>
  );
}

export default Artboard;