import React from 'react';

interface CanvasProps {
  children?: React.ReactNode;
  onClick(): void;
  onMouseOver(): void;
}

class Canvas extends React.Component<CanvasProps, {}> {
  render() {
    return (
      <div className='c-canvas'>
        {this.props.children}
        <div
          className='c-canvas__escape'
          onClick={this.props.onClick}
          onMouseOver={this.props.onMouseOver} />
      </div>
    );
  }
}

export default Canvas;
