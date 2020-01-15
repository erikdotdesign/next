import React, { useRef, useEffect } from 'react';
import Artboard from './Artboard';

interface CanvasProps {
  artboard: any;
  images: any;
  svgs: any;
  selection: any;
  setSelection: any;
  hover: any;
  setHover: any;
  viewPortSize: any;
  zoom: any;
  setZoom: any;
  showNotes: boolean;
  edit: boolean;
  setEdit: any;
  notes: any;
  setNotes: any;
  composing: boolean;
}

let startGestureZoom = 0;
let gestureZoom = 1;

const Canvas = (props: CanvasProps) => {
  const canvas = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    props.setSelection('');
  }
  const handleMouseOver = () => {
    props.setHover('');
  }
  const handleGestureStart = (e: any) => {
    e.preventDefault();
    startGestureZoom = gestureZoom;
  }
  const handleGestureChange = (e: any) => {
    e.preventDefault();
    props.setZoom(startGestureZoom * e.scale);
  }
  const handleGestureEnd = (e: any) => {
    e.preventDefault();
  }
  useEffect(() => {
    canvas.current?.addEventListener('gesturestart', handleGestureStart);
    canvas.current?.addEventListener('gesturechange', handleGestureChange);
    canvas.current?.addEventListener('gestureend', handleGestureEnd);
  }, []);
  useEffect(() => {
    gestureZoom = props.zoom;
  }, [props.zoom]);
  return (
    <div
      className='c-canvas'
      id='canvas'
      ref={canvas}>
      <Artboard
        artboard={props.artboard}
        images={props.images}
        svgs={props.svgs}
        selection={props.selection}
        setSelection={props.setSelection}
        hover={props.hover}
        setHover={props.setHover}
        zoom={props.zoom}
        showNotes={props.showNotes}
        edit={props.edit}
        setEdit={props.setEdit}
        notes={props.notes}
        setNotes={props.setNotes}
        composing={props.composing} />
      <div
        className='c-canvas__escape'
        onClick={handleClick}
        onMouseOver={handleMouseOver} />
    </div>
  );
}

export default Canvas;