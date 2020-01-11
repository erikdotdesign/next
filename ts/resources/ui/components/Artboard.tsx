import React, { useRef }  from 'react';
import Layers from './Layers';
import Selection from './Selection';
import Hover from './Hover';
import artboardStyles from '../styles/artboardStyles';

interface ArtboardProps {
  artboard: any;
  images: any;
  svgs: any;
  zoom: any;
  selection: any;
  setSelection: any;
  hover: any;
  setHover: any;
}

const Artboard = (props: ArtboardProps) => {
  const artboardRef = useRef<HTMLDivElement>(null);
  const { artboard, images, svgs, selection, setSelection, hover, setHover, zoom } = props;
  const onClick = () => {
    setSelection('');
  }
  const onMouseOver = () => {
    setHover(props.artboard);
  }
  return (
    <div
      ref={artboardRef}
      className='c-artboard'
      id='artboard'
      style={{
        ...artboardStyles(artboard),
        transform: `scale(${props.zoom})`
      }}>
      <Layers
        layers={artboard.layers}
        images={images}
        svgs={svgs}
        setSelection={setSelection}
        setHover={setHover}
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