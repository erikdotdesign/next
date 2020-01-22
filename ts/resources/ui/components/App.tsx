import React, { useRef, useState, useEffect } from 'react';
import SidebarRight from './SidebarRight';
import SidebarLeft from './SidebarLeft';
import Canvas from './Canvas';
import TopBar from './TopBar';

interface AppProps {
  artboard: srm.Artboard;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
  notes: srm.Notes;
  composing: boolean;
}

const App = (props: AppProps) => {
  const app = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState<boolean>(false);
  // selection and hover
  const [selection, setSelection] = useState<srm.AppLayer | null>(null);
  const [hover, setHover] = useState<srm.AppLayer | null>(null);
  // zoom
  const [zoom, setZoom] = useState<number>(1);
  const [baseZoom, setBaseZoom] = useState<number>(1);
  // scroll
  const canvasSize: number = 20000;
  const sidebarSize: number = 320;
  const [centerScroll, setCenterScroll] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [viewPortSize, setViewPortSize] = useState<{width: number, height: number}>({width: 0, height: 0});
  // notes
  const [notes, setNotes] = useState<any>(props.notes);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(true);

  const scaleArtboardForViewport = (): number => {
    const artboardWidth: number = props.artboard.frame.width;
    const artboardHeight: number = props.artboard.frame.height;
    const maxWidth: number = Math.min(viewPortSize.width, artboardWidth);
    const maxHeight: number = Math.min(viewPortSize.height, artboardHeight);
    const maxRatio: number = maxWidth / maxHeight;
    const artboardRatio: number = artboardWidth / artboardHeight;
    // dims of artboard scaled to fit in viewport
    if (maxRatio > artboardRatio) {
      // height is the constraining dimension
      return maxHeight / artboardHeight;
    } else {
      // width is the constraining dimension
      return maxWidth / artboardWidth;
    }
  }

  const getViewPortSize = (): {width: number, height: number} => {
    return {
      width: window.innerWidth - sidebarSize * 2,
      height: window.innerHeight - 48
    }
  }

  const handleResize = (): void => {
    setViewPortSize(getViewPortSize());
  }

  const handleInitialRender = (callback: any): void => {
    handleResize();
    callback();
  }

  const scrollToCenter = (): void => {
    window.scrollTo(centerScroll.x, centerScroll.y);
  }

  const handleKeyPress = (e: any): void => {
    if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
      e.preventDefault();
      setZoom(zoom - 0.1);
    } else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
      e.preventDefault();
      setZoom(zoom + 0.1);
    } else if (e.key === 'Enter' && e.metaKey && e.altKey && e.ctrlKey) {
      e.preventDefault();
      setZoom(baseZoom);
      scrollToCenter();
    }
  }

  useEffect(() => {
    // focus app for key events
    app.current?.focus();
    // set reszie listener
    window.addEventListener('resize', handleResize);
    // set viewportsize
    // scale artboard
    // set app ready
    handleInitialRender(() => setReady(true));
  }, []);

  useEffect(() => {
    // get and set base zoom
    const artboardScale = scaleArtboardForViewport();
    setZoom(artboardScale);
    setBaseZoom(artboardScale);
    // get artboard size
    const artboardHeight: number = props.artboard.frame.height * artboardScale;
    const artboardWidth: number = props.artboard.frame.width * artboardScale;
    const artboardHeightMid: number = artboardHeight / 2;
    const artboardWidthMid: number = artboardWidth / 2;
    // get and set offsets
    const canvasCenter: number = canvasSize / 2;
    const leftOffset: number = canvasCenter - artboardWidthMid - sidebarSize;
    const topOffset: number = canvasCenter - artboardHeightMid;
    const rightRemainder: number = viewPortSize.width - artboardWidth;
    const bottomRemainder: number = viewPortSize.height - artboardHeight;
    // scroll to center
    window.scrollTo(leftOffset - (rightRemainder / 2), topOffset - (bottomRemainder / 2));
    // set center scroll position
    setCenterScroll({
      x: leftOffset - (rightRemainder / 2),
      y: topOffset - (bottomRemainder / 2)
    });
  }, [viewPortSize]);


  // SCROLL PERFORMANCE IS HORRIBLE ON SAFARI FOR NESTED COMPONENTS
  return (
    <div
      className='c-app'
      tabIndex={-1}
      ref={app}
      onKeyDown={handleKeyPress}>
      <TopBar
        selection={selection}
        zoom={zoom}
        setZoom={setZoom}
        baseZoom={baseZoom}
        notes={notes}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        edit={edit}
        setEdit={setEdit}
        scrollToCenter={scrollToCenter}
        composing={props.composing} />
      <SidebarLeft
        selection={selection}
        setSelection={setSelection}
        artboard={props.artboard} />
      <SidebarRight
        selection={selection}
        images={props.images}
        svgs={props.svgs}
        notes={notes}
        setNotes={setNotes}
        edit={edit}
        composing={props.composing} />
      <Canvas
        {...props}
        ready={ready}
        zoom={zoom}
        setZoom={setZoom}
        selection={selection}
        setSelection={setSelection}
        hover={hover}
        setHover={setHover}
        viewPortSize={viewPortSize}
        showNotes={showNotes}
        edit={edit}
        setEdit={setEdit}
        notes={notes}
        setNotes={setNotes}
        composing={props.composing} />
    </div>
  );
}

export default App;
