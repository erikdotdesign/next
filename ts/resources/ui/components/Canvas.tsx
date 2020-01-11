import React, { useState, useRef, useEffect } from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';

interface CanvasProps {
  artboard: any;
  images: any;
  svgs: any;
  zoom: any;
  setZoom: any;
  selection: any;
  setSelection: any;
  hover: any;
  setHover: any;
  leftScroll: any;
  topScroll: any;
  viewPortSize: any;
  canvasSize: any;
}

const Canvas = (props: CanvasProps) => {
  const [gestureZoom, setGestureZoom] = useState(1);
  const canvas = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    props.setSelection('');
  }
  const handleMouseOver = () => {
    props.setHover('');
  }
  const handleGestureStart = (e: any) => {
    e.preventDefault();
  }
  const handleGestureChange = (e: any) => {
    e.preventDefault();
    setGestureZoom(e.scale);
  }
  const handleGestureEnd = (e: any) => {
    e.preventDefault();
  }
  const handlePan = () => {
    if (props.zoom < 4.98) {
      props.setZoom(props.zoom + 0.02);
    }
  }
  const handlePinch = () => {
    if (props.zoom > 0.01) {
      props.setZoom(props.zoom - 0.02);
    }
  }
  useEffect(() => {
    if (canvas.current) {
      canvas.current.addEventListener('gesturestart', handleGestureStart);
      canvas.current.addEventListener('gesturechange', handleGestureChange);
      canvas.current.addEventListener('gestureend', handleGestureEnd);
    }
  }, []);
  useEffect(() => {
    gestureZoom % Math.floor(gestureZoom) ? handlePan() : handlePinch();
  }, [gestureZoom]);
  return (
    <div
      className='c-canvas'
      ref={canvas}>
      <CanvasRules
        leftScroll={props.leftScroll}
        topScroll={props.topScroll}
        sectionSize={100}
        unitSize={10}
        canvasSize={props.canvasSize} />
      <Artboard
        artboard={props.artboard}
        images={props.images}
        svgs={props.svgs}
        zoom={props.zoom}
        selection={props.selection}
        setSelection={props.setSelection}
        hover={props.hover}
        setHover={props.setHover} />
      <div
        className='c-canvas__escape'
        onClick={handleClick}
        onMouseOver={handleMouseOver} />
    </div>
  );
}

export default Canvas;