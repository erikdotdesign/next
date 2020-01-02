import React from 'react';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import { createArtboardStyles } from '../../utils/layerStyles';

interface ArtboardProps {
  artboard: any;
  images: any;
  svgs: any;
  appState: any;
  setAppState: any;
}

const Artboard = (props: ArtboardProps) => {
  const { artboard, images, svgs, setAppState, appState } = props;
  const { selection, hover } = appState;
  const onClick = () => {
    props.setAppState({
      selection: ''
    });
  }
  const onMouseOver = () => {
    props.setAppState({
      hover: props.artboard
    });
  }
  return (
    <div
      className='c-artboard'
      style={createArtboardStyles(artboard)}>
      <Layers
        layers={artboard.layers}
        images={images}
        svgs={svgs}
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
        onClick={onClick}
        onMouseOver={onMouseOver} />
    </div>
  );
}

export default Artboard;
