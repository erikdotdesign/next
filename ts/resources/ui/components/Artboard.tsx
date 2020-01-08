import React from 'react';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import { createArtboardStyles } from '../../utils/layerStyles';
//import { getOrigin } from '../../utils/appUtils';

interface ArtboardProps {
  artboard: any;
  images: any;
  svgs: any;
  appState: any;
  setAppState: any;
  zoom: number;
}

const Artboard = (props: ArtboardProps) => {
  const { artboard, images, svgs, setAppState, appState, zoom } = props;
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
      style={{
        ...createArtboardStyles(artboard),
        transform: `scale(${zoom})`,
        // transformOrigin: selection
        // ? `${getOrigin(selection.frame).xCenter}px ${getOrigin(selection.frame).yCenter}px`
        // : `${getOrigin(artboard.frame).xCenter}px ${getOrigin(artboard.frame).yCenter}px`
      }}>
      <Layers
        layers={artboard.layers}
        images={images}
        svgs={svgs}
        setAppState={setAppState}
        appState={appState}
        style={{
          width: `${artboard.frame.width}px`,
          height: `${artboard.frame.height}px`
        }} />
      {
        selection
        ? <Selection
            selection={selection}
            hover={hover}
            artboard={artboard}
            zoom={zoom} />
        : null
      }
      {
        hover
        ? <Hover
            hover={hover}
            selection={selection}
            artboard={artboard}
            zoom={zoom} />
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
