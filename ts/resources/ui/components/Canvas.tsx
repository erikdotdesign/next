import React, { useRef, useState } from 'react';
import Artboard from './Artboard';

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
  const zoomOut = () => {
    if (canvas.current && zoom >= 0.2) {
      canvas.current.focus();
      const newZoom = zoom - 0.1;
      canvas.current.style.zoom = `${newZoom}`;
      setZoom(newZoom);
    }
  }
  const zoomIn = () => {
    if (canvas.current && zoom <= 2) {
      canvas.current.focus();
      const newZoom = zoom + 0.1;
      canvas.current.style.zoom = `${newZoom}`;
      setZoom(newZoom);
    }
  }
  const handleKeyPress = (e: any) => {
    e.preventDefault();
    if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
      zoomOut();
    } else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
      zoomIn();
    }
  }
  return (
    <div className='c-canvas'>
      <div className='c-canvas__controls'>
        <div className='c-canvas-control c-canvas-control--zoom'>
          <div className='c-canvas-zoom__buttons'>
            <div
              className='c-canvas-zoom-button c-canvas-zoom-button--in'
              onClick={zoomIn} />
            <div
              className='c-canvas-zoom-button c-canvas-zoom-button--out'
              onClick={zoomOut} />
          </div>
          <div className='c-canvas-zoom__status'>
            {`${Math.round(zoom * 100)}%`}
          </div>
        </div>
        <div className='c-canvas-control c-canvas-control--layers'>
          {props.artboard.layers.length}
        </div>
      </div>
      <div
        className='c-canvas__canvas'
        ref={canvas}
        onKeyDown={handleKeyPress}
        tabIndex={-1}>
        <Artboard {...props} />
        <div
          className='c-canvas__escape'
          onClick={onClick}
          onMouseOver={onMouseOver} />
      </div>
    </div>
  );
}

export default Canvas;
