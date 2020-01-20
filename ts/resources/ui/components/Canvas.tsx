import React, { useRef, useEffect } from 'react';
import Artboard from './Artboard';

interface CanvasProps {
  artboard: srm.Artboard;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
  selection: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null;
  hover: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null;
  viewPortSize: {width: number, height: number};
  zoom: number;
  showNotes: boolean;
  edit: boolean;
  notes: srm.Notes;
  composing: boolean;
  ready: boolean;
  setSelection(selection: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null): void;
  setHover(hover: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null): void;
  setZoom(zoom: number): void;
  setEdit(edit: boolean): void;
  setNotes(notes: srm.Notes): void;
}

let startGestureZoom = 0;
let gestureZoom = 1;

const Canvas = (props: CanvasProps) => {
  const { artboard, images, svgs, selection, setSelection, hover, setHover, setZoom, zoom, showNotes, edit, setEdit, notes, setNotes, composing, ready } = props;
  const canvas = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setSelection(null);
  }
  const handleMouseOver = () => {
    setHover(null);
  }
  const handleGestureStart = (e: any) => {
    e.preventDefault();
    startGestureZoom = gestureZoom;
  }
  const handleGestureChange = (e: any) => {
    e.preventDefault();
    setZoom(startGestureZoom * e.scale);
  }
  const handleGestureEnd = (e: any) => {
    e.preventDefault();
  }
  const handleWheel = (e: any) => {
    if (e.ctrlKey) {
      let nextZoom = gestureZoom - e.deltaY * 0.01;
      e.preventDefault();
      if (e.deltaY < 0 && nextZoom < 5) {
        setZoom(gestureZoom -= e.deltaY * 0.01);
      } else if (e.deltaY > 0 && nextZoom > 0) {
        setZoom(gestureZoom -= e.deltaY * 0.01);
      }
    }
  }
  useEffect(() => {
    canvas.current?.addEventListener('gesturestart', handleGestureStart);
    canvas.current?.addEventListener('gesturechange', handleGestureChange);
    canvas.current?.addEventListener('gestureend', handleGestureEnd);
  }, []);
  useEffect(() => {
    gestureZoom = zoom;
  }, [zoom]);
  return (
    <div
      className='c-canvas'
      id='canvas'
      ref={canvas}
      onWheel={handleWheel}>
      {
        ready
        ? <Artboard
            artboard={artboard}
            images={images}
            svgs={svgs}
            selection={selection}
            setSelection={setSelection}
            hover={hover}
            setHover={setHover}
            zoom={zoom}
            showNotes={showNotes}
            edit={edit}
            setEdit={setEdit}
            notes={notes}
            setNotes={setNotes}
            composing={composing} />
        : null
      }
      <div
        className='c-canvas__escape'
        onClick={handleClick}
        onMouseOver={handleMouseOver} />
    </div>
  );
}

export default Canvas;