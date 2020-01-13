import React, { useState, useRef, useEffect } from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';
import { between } from '../utils';

interface CanvasProps {
  artboard: any;
  images: any;
  svgs: any;
  selection: any;
  setSelection: any;
  hover: any;
  setHover: any;
  leftScroll: any;
  topScroll: any;
  viewPortSize: any;
  canvasSize: any;
  zoom: any;
  setZoom: any;
  showNotes: boolean;
}

let startGestureZoom = 0;
let gestureZoom = 1;

const Canvas = (props: CanvasProps) => {
  //const [gestureZoom, setGestureZoom] = useState(0);
  //const [startZoom, setStartZoom] = useState(0);
  //const [unitSize, setUnitSize] = useState(10);
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
  // const updateSectionSize = () => {
  //   if (between(zoom, 1.5, 2)) {
  //     setSectionSize(50);
  //   } else if (between(zoom, 1, 1.5)) {
  //     setSectionSize(100);
  //   } else if (between(zoom, 0.75, 1)) {
  //     setSectionSize(150);
  //   } else if (between(zoom, 0.5, 0.75)) {
  //     setSectionSize(200);
  //   } else if (between(zoom, 0.25, 0.5)) {
  //     setSectionSize(250);
  //   } else if (between(zoom, 0.15, 0.25)) {
  //     setSectionSize(300);
  //   } else if (between(zoom, 0, 0.15)) {
  //     setSectionSize(350);
  //   }
  // }
  // const updateUnitSize = () => {
  //   if (between(zoom, 1.5, 2)) {
  //     setUnitSize(5);
  //   } else if (between(zoom, 1, 1.5)) {
  //     setUnitSize(10);
  //   } else if (between(zoom, 0.75, 1)) {
  //     setUnitSize(15);
  //   } else if (between(zoom, 0.5, 0.75)) {
  //     setUnitSize(20);
  //   } else if (between(zoom, 0.25, 0.5)) {
  //     setUnitSize(25);
  //   } else if (between(zoom, 0.15, 0.25)) {
  //     setUnitSize(30);
  //   } else if (between(zoom, 0, 0.15)) {
  //     setUnitSize(35);
  //   }
  // }
  useEffect(() => {
    canvas.current?.addEventListener('gesturestart', handleGestureStart);
    canvas.current?.addEventListener('gesturechange', handleGestureChange);
    canvas.current?.addEventListener('gestureend', handleGestureEnd);
  }, []);
  useEffect(() => {
    gestureZoom = props.zoom;
    //let startZoom = props.zoom;
    //props.setZoom(startZoom * gestureZoom);
    //updateSectionSize();
    //updateUnitSize();
  }, [props.zoom]);
  return (
    <div
      className='c-canvas'
      id='canvas'
      ref={canvas}>
      {/* <CanvasRules
        leftScroll={props.leftScroll}
        topScroll={props.topScroll}
        sectionSize={sectionSize}
        unitSize={1}
        canvasSize={props.canvasSize}
        zoom={zoom}
        artboardWidth={props.artboard.frame.width * zoom}
        artboardHeight={props.artboard.frame.height * zoom} /> */}
      <Artboard
        artboard={props.artboard}
        images={props.images}
        svgs={props.svgs}
        selection={props.selection}
        setSelection={props.setSelection}
        hover={props.hover}
        setHover={props.setHover}
        zoom={props.zoom}
        showNotes={props.showNotes} />
      <div
        className='c-canvas__escape'
        onClick={handleClick}
        onMouseOver={handleMouseOver} />
    </div>
  );
}

export default Canvas;