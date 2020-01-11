import React from 'react';
import Artboard from './Artboard';
import CanvasRules from './CanvasRules';

interface CanvasProps {
  artboard: any;
  images: any;
  svgs: any;
  zoom: any;
  setZoom: any;
  baseZoom: any;
  setBaseZoom: any;
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
  const handleClick = () => {
    props.setSelection('');
  }
  const handleMouseOver = () => {
    props.setHover('');
  }
  return (
    <div className='c-canvas'>
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