import React, { useEffect, useRef }  from 'react';
import Layers from './Layers';
import gsap from 'gsap';
import Selection from './Selection';
import GroupSelection from './GroupSelection';
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
  groupSelection: srm.Group | null;
  groupSelectionNest: srm.Group[] | null;
  hover: srm.AppLayer | null;
  zoom: number;
  showNotes: boolean;
  edit: boolean;
  composing: boolean;
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setNotes(notes: srm.Notes): void;
}

const Artboard = (props: ArtboardProps) => {
  const artboardRef = useRef<HTMLDivElement>(null);
  const { artboard, images, svgs, selection, setSelection, groupSelection, setGroupSelection, groupSelectionNest, setGroupSelectionNest, hover, setHover, zoom, showNotes, edit, notes, setNotes, composing } = props;
  const onClick = (): void => {
    setSelection(artboard);
  }
  const onMouseOver = (): void => {
    setHover(artboard);
  }
  useEffect(() => {
    setSelection(artboard);
  }, []);
  useEffect(() => {
    gsap.set(artboardRef.current, {scale: zoom});
  }, [zoom]);
  return (
    <div
      id={artboard.id}
      className='c-artboard'
      ref={artboardRef}
      style={artboardStyles(artboard)}>
      <Layers
        layers={artboard.layers as srm.AppArtboardLayer[]}
        images={images}
        svgs={svgs}
        setSelection={setSelection}
        setGroupSelection={setGroupSelection}
        setHover={setHover} />
      {
        groupSelection
        ? <GroupSelection
            groupSelection={groupSelection}
            images={images}
            svgs={svgs}
            setSelection={setSelection}
            setGroupSelection={setGroupSelection}
            setHover={setHover}
            artboard={artboard}
            zoom={zoom} />
        : null
      }
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
            artboard={artboard}
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