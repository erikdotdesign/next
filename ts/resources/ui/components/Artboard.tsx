import React, { useEffect, useRef }  from 'react';
import Layers from './Layers';
import gsap from 'gsap';
import Selection from './Selection';
import Hover from './Hover';
import artboardStyles from '../styles/artboardStyles';

interface ArtboardProps {
  artboard: any;
  images: any;
  svgs: any;
  selection: any;
  setSelection: any;
  hover: any;
  setHover: any;
  zoom: any;
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
  const scrollNow = () => {
    const ref = artboardRef.current;
    window.scrollTo(ref.offsetLeft, ref.offsetTop);
  }
  useEffect(() => {
    gsap.set(artboardRef.current, {scale: props.zoom});
    console.log(artboardRef);
  }, [props.zoom]);
  return (
    <div
      className='c-artboard'
      ref={artboardRef}
      style={artboardStyles(artboard)}
      onClick={scrollNow}>
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