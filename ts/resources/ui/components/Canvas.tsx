import React, { useRef, useEffect } from 'react';
import Artboard from './Artboard';
import BackButton from './BackButton';
import ThemeContext from './ThemeContext';

interface CanvasProps {
  artboard: next.Artboard;
  images: next.ImgAsset[];
  svgs: next.SvgAsset[];
  selection: next.AppLayer | null;
  groupSelection: next.Group | null;
  groupSelectionNest: next.Group[] | null;
  hover: next.AppLayer | null;
  zoom: number;
  ready: boolean;
  setSelection(selection: next.AppLayer | null): void;
  setGroupSelection(groupSelection: next.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: next.Group[] | null): void;
  setHover(hover: next.AppLayer | null): void;
  setZoom(zoom: number): void;
}

let startGestureZoom = 0;
let gestureZoom = 1;

const Canvas = (props: CanvasProps) => {
  const { artboard, images, svgs, selection, setSelection, groupSelection, setGroupSelection, groupSelectionNest, setGroupSelectionNest, hover, setHover, setZoom, zoom, ready } = props;
  const canvas = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setSelection(null);
  }
  const handleMouseOver = () => {
    setHover(null);
  }
  const handleGestureStart = (e: any) => {
    e.preventDefault();
    startGestureZoom = gestureZoom;
  }
  const handleGestureChange = (e: any) => {
    e.preventDefault();
    setZoom(startGestureZoom * e.scale);
  }
  const handleGestureEnd = (e: any) => {
    e.preventDefault();
  }
  const handleWheel = (e: any) => {
    if (e.ctrlKey) {
      let nextZoom = gestureZoom - e.deltaY * 0.01;
      e.preventDefault();
      if (e.deltaY < 0 && nextZoom < 5) {
        setZoom(gestureZoom -= e.deltaY * 0.01);
      } else if (e.deltaY > 0 && nextZoom > 0) {
        setZoom(gestureZoom -= e.deltaY * 0.01);
      }
    }
  }
  useEffect(() => {
    canvas.current?.addEventListener('gesturestart', handleGestureStart);
    canvas.current?.addEventListener('gesturechange', handleGestureChange);
    canvas.current?.addEventListener('gestureend', handleGestureEnd);
  }, []);
  useEffect(() => {
    gestureZoom = zoom;
  }, [zoom]);
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className='c-canvas'
          id='canvas'
          ref={canvas}
          onWheel={handleWheel}
          style={{background: theme.background.z0}}>
          {
            groupSelectionNest
            ? <BackButton
                artboard={artboard}
                setSelection={setSelection}
                setGroupSelection={setGroupSelection}
                groupSelectionNest={groupSelectionNest}
                setGroupSelectionNest={setGroupSelectionNest} />
            : null
          }
          {
            ready
            ? <Artboard
                artboard={artboard}
                images={images}
                svgs={svgs}
                selection={selection}
                setSelection={setSelection}
                groupSelection={groupSelection}
                setGroupSelection={setGroupSelection}
                groupSelectionNest={groupSelectionNest}
                setGroupSelectionNest={setGroupSelectionNest}
                hover={hover}
                setHover={setHover}
                zoom={zoom} />
            : null
          }
          <div
            className='c-canvas__escape'
            onClick={handleClick}
            onMouseOver={handleMouseOver} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Canvas;