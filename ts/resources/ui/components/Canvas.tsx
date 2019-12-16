import React from 'react';

interface CanvasProps {
  children?: React.ReactNode;
}

class Canvas extends React.Component<CanvasProps, {}> {
  render() {
    return (
      <div className='c-canvas'>
        {this.props.children}
      </div>
    );
  }
}

export default Canvas;
