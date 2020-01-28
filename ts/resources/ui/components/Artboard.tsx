import React, { useEffect, useRef }  from 'react';
import Layers from './Layers';
import gsap from 'gsap';
import Selection from './Selection';
import GroupSelection from './GroupSelection';
import Hover from './Hover';
import artboardStyles from '../styles/artboardStyles';

interface ArtboardProps {
  artboard: srm.Artboard;
  images: srm.Asset[];
  svgs: srm.Asset[];
  selection: srm.AppLayer | null;
  groupSelection: srm.Group | null;
  groupSelectionNest: srm.Group[] | null;
  hover: srm.AppLayer | null;
  zoom: number;
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
  setHover(hover: srm.AppLayer | null): void;
}

const Artboard = (props: ArtboardProps) => {
  const artboardRef = useRef<HTMLDivElement>(null);
  const { artboard, images, svgs, selection, setSelection, groupSelection, setGroupSelection, setGroupSelectionNest, hover, setHover, zoom } = props;
  const onClick = (): void => {
    setSelection(artboard);
  }
  const onDoubleClick = () => {
    setGroupSelection(null);
    setGroupSelectionNest(null);
  }
  const onMouseOver = (): void => {
    setHover(artboard);
  }
  useEffect(() => {
    setSelection(artboard);
    console.log(artboard.layers);
  }, []);
  useEffect(() => {
    gsap.set(artboardRef.current, {scale: zoom});
  }, [zoom]);
  return (
    <div
      id={artboard.id}
      className='c-artboard'
      ref={artboardRef}
      style={artboardStyles(artboard)}>
      <div className='c-artboard__layers'>
        <Layers
          layers={artboard.layers as srm.AppArtboardLayer[]}
          images={images}
          svgs={svgs}
          setSelection={setSelection}
          setGroupSelection={setGroupSelection}
          setHover={setHover} />
      </div>
      {
        groupSelection
        ? <GroupSelection
            groupSelection={groupSelection}
            images={images}
            svgs={svgs}
            setSelection={setSelection}
            setGroupSelection={setGroupSelection}
            setHover={setHover}
            artboard={artboard} />
        : null
      }
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
        onDoubleClick={onDoubleClick}
        onMouseOver={onMouseOver} />
    </div>
  );
}

export default Artboard;