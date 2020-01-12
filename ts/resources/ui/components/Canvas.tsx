import React, { useRef, useEffect } from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';

interface CanvasProps {
  artboard: any;
  images: any;
  svgs: any;
  selection: any;
  setSelection: any;
  zoom: any;
  updateZoom: any;
  hover: any;
  setHover: any;
  leftScroll: any;
  topScroll: any;
  viewPortSize: any;
  canvasSize: any;
}

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
    window.$startZoom = window.$zoom;
  }
  const handleGestureChange = (e: any) => {
    e.preventDefault();
    window.$zoom = window.$startZoom * e.scale;
    window.$renderZoom();
    props.updateZoom(window.$startZoom * e.scale);
  }
  const handleGestureEnd = (e: any) => {
    e.preventDefault();
  }
  useEffect(() => {
    if (canvas.current) {
      canvas.current.addEventListener('gesturestart', handleGestureStart);
      canvas.current.addEventListener('gesturechange', handleGestureChange);
      canvas.current.addEventListener('gestureend', handleGestureEnd);
    }
  }, []);
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
        selection={props.selection}
        setSelection={props.setSelection}
        hover={props.hover}
        setHover={props.setHover}
        zoom={props.zoom} />
      <div
        className='c-canvas__escape'
        onClick={handleClick}
        onMouseOver={handleMouseOver} />
    </div>
  );
}

export default Canvas;