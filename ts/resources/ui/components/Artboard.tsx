import React from 'react';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import { createArtboardStyles } from '../../utils/layerStyles';

interface ArtboardProps {
  artboard: any;
  images: any;
  appState: any;
  setAppState: any;
}

class Artboard extends React.Component<ArtboardProps, {}> {
  onClick = () => {
    this.props.setAppState({
      selection: ''
    });
  }
  onMouseOver = () => {
    this.props.setAppState({
      hover: this.props.artboard
    });
  }
  render() {
    const { artboard, images, setAppState, appState } = this.props;
    const { selection, hover } = appState;
    return (
      <div
        className='c-artboard'
        style={createArtboardStyles(artboard)}>
        <Layers
          layers={artboard.layers}
          images={images}
          setAppState={setAppState}
          appState={appState} />
        {
          selection
          ? <Selection
              selection={selection}
              hover={hover}
              artboard={artboard} />
          : null
        }
        {
          hover
          ? <Hover
              hover={hover}
              selection={selection}
              artboard={artboard} />
          : null
        }
        <div
          className='c-artboard__click-area'
          onClick={this.onClick}
          onMouseOver={this.onMouseOver} />
      </div>
    );
  }
}

export default Artboard;
