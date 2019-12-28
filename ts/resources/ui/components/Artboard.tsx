import React from 'react';
import { createArtboardStyles } from '../../utils/layerStyles';

interface ArtboardProps {
  artboard: any;
  children?: React.ReactNode;
  onClick(): void;
  onMouseOver(): void;
}

class Artboard extends React.Component<ArtboardProps, {}> {
  componentDidMount() {
    console.log(this.props.artboard);
  }
  render() {
    return (
      <div
        className='c-artboard'
        style={createArtboardStyles(this.props.artboard)}>
        {this.props.children}
        <div
          className='c-artboard__click-area'
          onClick={this.props.onClick}
          onMouseOver={this.props.onMouseOver} />
      </div>
    );
  }
}

export default Artboard;
