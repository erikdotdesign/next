import React from 'react';
import { createArtboardStyles } from '../../utils/layerStyles';

interface ArtboardProps {
  artboard: any;
  children?: React.ReactNode;
}

class Artboard extends React.Component<ArtboardProps, {}> {
  render() {
    return (
      <div
        data-layer-name={this.props.artboard.name}
        className='c-artboard'
        style={createArtboardStyles(this.props.artboard)}>
        {this.props.children}
      </div>
    );
  }
}

export default Artboard;
