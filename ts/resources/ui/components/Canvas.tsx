import React from 'react';
import Artboard from './Artboard';

interface CanvasProps {
  appState: any;
  setAppState: any;
  artboard: any;
  images: any;
}

class Canvas extends React.Component<CanvasProps, {}> {
  onClick = () => {
    this.props.setAppState({
      selection: ''
    });
  }
  onMouseOver = () => {
    this.props.setAppState({
      hover: ''
    });
  }
  render() {
    return (
      <div className='c-canvas'>
        <Artboard {...this.props} />
        <div
          className='c-canvas__escape'
          onClick={this.onClick}
          onMouseOver={this.onMouseOver} />
      </div>
    );
  }
}

export default Canvas;
