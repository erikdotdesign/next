import React from 'react';
import Artboard from './Artboard';

interface CanvasProps {
  appState: any;
  setAppState: any;
  artboard: any;
  images: any;
  svgs: any;
}

const Canvas = (props: CanvasProps) => {
  const onClick = () => {
    props.setAppState({
      selection: ''
    });
  }
  const onMouseOver = () => {
    props.setAppState({
      hover: ''
    });
  }
  return (
    <div className='c-canvas'>
      <Artboard {...props} />
      <div
        className='c-canvas__escape'
        onClick={onClick}
        onMouseOver={onMouseOver} />
    </div>
  );
}

export default Canvas;
