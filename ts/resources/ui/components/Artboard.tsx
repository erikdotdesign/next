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
  zoom: number;
}

const Artboard = (props: ArtboardProps) => {
  const { artboard, appState, zoom } = props;
  const { selection, hover } = appState;
  return (
    <div
      className='c-artboard'
      style={{
        ...createArtboardStyles(artboard),
        transform: `scale(${zoom})`
      }}>
      <Layers {...props} />
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
    </div>
  );
}

export default Artboard;
