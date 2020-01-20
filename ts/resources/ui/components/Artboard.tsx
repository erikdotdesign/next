import React, { useEffect, useRef }  from 'react';
import Layers from './Layers';
import gsap from 'gsap';
import Selection from './Selection';
import Hover from './Hover';
import Notes from './Notes';
import NoteAdd from './NoteAdd';
import artboardStyles from '../styles/artboardStyles';

interface ArtboardProps {
  artboard: srm.Artboard;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
  notes: srm.Notes;
  selection: srm.AppLayer | null;
  hover: srm.AppLayer | null;
  zoom: number;
  showNotes: boolean;
  edit: boolean;
  composing: boolean;
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setNotes(notes: srm.Notes): void;
}

const Artboard = (props: ArtboardProps) => {
  const artboardRef = useRef<HTMLDivElement>(null);
  const { artboard, images, svgs, selection, setSelection, hover, setHover, zoom, showNotes, edit, notes, setNotes, composing } = props;
  const onClick = (): void => {
    setSelection(artboard);
  }
  const onMouseOver = (): void => {
    setHover(artboard);
  }
  useEffect(() => {
    gsap.set(artboardRef.current, {scale: zoom});
  }, [zoom]);
  return (
    <div
      className='c-artboard'
      ref={artboardRef}
      style={artboardStyles(artboard)}>
      <Layers
        layers={artboard.layers as (srm.ShapePath | srm.Shape | srm.Image | srm.Text)[]}
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
        selection && edit && composing
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