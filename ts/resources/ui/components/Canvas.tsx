import React, { useRef, useState } from 'react';
import Artboard from './Artboard';
import CanvasControls from './CanvasControls';
import CanvasEscape from './CanvasEscape';
import { throttle } from '../utils';

interface CanvasProps {
  appState: any;
  setAppState: any;
  artboard: any;
  images: any;
  svgs: any;
}

const Canvas = (props: CanvasProps) => {
  const canvas = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const zoomOut = throttle(() => {
    if (canvas.current && zoom > 0.1) {
      const newZoom = parseFloat((zoom - 0.1).toFixed(1));
      setZoom(newZoom);
    }
  }, 1500);
  const zoomIn = throttle(() => {
    if (canvas.current && zoom < 2) {
      const newZoom = parseFloat((zoom + 0.1).toFixed(1));
      setZoom(newZoom);
    }
  }, 1500);
  const handleKeyPress = (e: any) => {
    e.preventDefault();
    if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
      zoomOut();
    } else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
      zoomIn();
    }
  }
  return (
    <div
      className='c-canvas'
      ref={canvas}
      onKeyDown={handleKeyPress}
      tabIndex={-1}>
      <CanvasControls
        zoom={zoom}
        zoomIn={zoomIn}
        zoomOut={zoomOut} />
      <Artboard
        {...props}
        zoom={zoom}
        style={{
          transform: `scale(${zoom})`
        }} />
      <CanvasEscape
        setAppState={props.setAppState}
        onClick={() => canvas.current?.focus()} />
    </div>
  );
}

export default Canvas;
