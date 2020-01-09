import React, { useRef, useState, useEffect } from 'react';
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
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
  const zoomOut = () => {
    const newZoom = zoom - 0.1;
    setZoom(newZoom);
  };
  const zoomIn = () => {
    const newZoom = zoom + 0.1;
    setZoom(newZoom);
  };
  const refresh = () => {
    const initialZoom = scaleToFitCanvas();
    const canvasSize = getCanvasSize();
    setZoom(initialZoom);
    setCanvasSize(canvasSize);
  };
  const handleKeyPress = (e: any) => {
    e.preventDefault();
    if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
      zoomOut();
    } else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
      zoomIn();
    } else if (e.key === 'Enter' && e.metaKey && e.altKey && e.ctrlKey) {
      refresh();
    }
  }
  const getCanvasSize = () => {
    if (canvas.current) {
      const width = canvas.current.clientWidth;
      const height = canvas.current.clientHeight;
      return {width, height};
    } else {
      return {width: 0, height: 0};
    }
  }
  const scaleToFitCanvas = () => {
    if (canvas.current) {
      const canvasSize = getCanvasSize();
      const artboardHeight = props.artboard.frame.height;
      const artboardWidth = props.artboard.frame.width;
      const maxHeight = Math.min(canvasSize.height, artboardHeight);
      const maxWidth = Math.min(canvasSize.width, artboardWidth);
      const maxRatio = maxWidth / maxHeight;
      const artboardRatio = artboardWidth / artboardHeight;
      // dims of artboard scaled to fit in viewport
      if (maxRatio > artboardRatio) {
        // height is the constraining dimension
        return maxHeight / artboardHeight;
      } else {
        // width is the constraining dimension
        return maxWidth / artboardWidth;
      }
    } else {
      return 1;
    }
  }
  useEffect(() => {
    const initialZoom = scaleToFitCanvas();
    const canvasSize = getCanvasSize();
    setZoom(initialZoom);
    setCanvasSize(canvasSize);
  }, []);
  return (
    <div
      className='c-canvas'
      ref={canvas}
      onKeyDown={handleKeyPress}
      tabIndex={-1}>
      <CanvasControls
        zoom={zoom}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        refresh={refresh} />
      <Artboard
        {...props}
        zoom={zoom}
        canvasSize={canvasSize} />
      <CanvasEscape
        setAppState={props.setAppState}
        onClick={() => canvas.current?.focus()} />
    </div>
  );
}

export default Canvas;
