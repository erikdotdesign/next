import React, { useRef, useState } from 'react';
import Artboard from './Artboard';
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
  const onClick = () => {
    if (canvas.current) {
      canvas.current.focus();
    }
    props.setAppState({
      selection: ''
    });
  }
  const onMouseOver = () => {
    props.setAppState({
      hover: ''
    });
  }
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
      <div className='c-canvas__controls'>
        <div className='c-canvas-control c-canvas-control--zoom'>
          <button
            className='c-canvas-zoom-button c-canvas-zoom-button--out'
            onClick={zoomOut}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z"/>
              <path fill="#fff" d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          <div className='c-canvas-zoom__status'>
            {`${Math.round(zoom * 100)}%`}
          </div>
          <button
            className='c-canvas-zoom-button c-canvas-zoom-button--in'
            onClick={zoomIn}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z"/>
              <path fill="#fff" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
        </div>
        {/* <div className='c-canvas-control c-canvas-control--layers'>
          {props.artboard.layers.length}
        </div> */}
      </div>
      <Artboard {...props} zoom={zoom} />
      <div
        className='c-canvas__escape'
        onClick={onClick}
        onMouseOver={onMouseOver} />
    </div>
  );
}

export default Canvas;
