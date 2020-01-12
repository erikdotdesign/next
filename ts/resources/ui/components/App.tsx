import React, { useRef, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Topbar from './Topbar';

interface AppProps {
  artboard: any;
  images: any;
  svgs: any;
}

const App = (props: AppProps) => {
  const app = useRef<HTMLDivElement>(null);
  const canvasSize = 20000;
  const [selection, setSelection] = useState('');
  const [hover, setHover] = useState('');
  const [leftScroll, setLeftScroll] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [baseZoom, setBaseZoom] = useState(1);
  const [topScroll, setTopScroll] = useState(0);
  const [centerScroll, setCenterScroll] = useState([0, 0]);
  const [viewPortSize, setViewPortSize] = useState({width: 0, height: 0});

  const scaleToFitViewport = () => {
    const artboardWidth = props.artboard.frame.width;
    const artboardHeight = props.artboard.frame.height;
    const maxWidth = Math.min(viewPortSize.width, artboardWidth);
    const maxHeight = Math.min(viewPortSize.height, artboardHeight);
    const maxRatio = maxWidth / maxHeight;
    const artboardRatio = artboardWidth / artboardHeight;
    // dims of artboard scaled to fit in viewport
    if (maxRatio > artboardRatio) {
      // height is the constraining dimension
      return maxHeight / artboardHeight;
    } else {
      // width is the constraining dimension
      return maxWidth / artboardWidth;
    }
  }

  const getViewPortSize = () => {
    // subtract sidebar width + left rule width
    const viewportWidth = window.innerWidth;
    // subtract artboard padding + top rule height
    const viewportHeight = window.innerHeight;
    return {
      width: viewportWidth,
      height: viewportHeight
    }
  }

  const handleScroll = () => {
    setLeftScroll(window.scrollX);
    setTopScroll(window.scrollY);
  }

  const handleResize = () => {
    setViewPortSize(getViewPortSize());
  }

  const handleKeyPress = (e: any) => {
    e.preventDefault();
    if (e.key === '-' && e.metaKey && e.altKey && e.ctrlKey) {
      setZoom(zoom - 0.1);
    } else if (e.key === '=' && e.metaKey && e.altKey && e.ctrlKey) {
      setZoom(zoom + 0.1);
    } else if (e.key === 'Enter' && e.metaKey && e.altKey && e.ctrlKey) {
      setZoom(baseZoom);
      window.scrollTo(canvasSize / 2, canvasSize / 2);
    }
  }

  useEffect(() => {
    app.current?.focus();
    // set scroll listener
    window.addEventListener('scroll', handleScroll);
    // set reszie listener
    window.addEventListener('resize', handleResize);
    // set viewportsize
    setViewPortSize(getViewPortSize());
  }, []);

  useEffect(() => {
    // get and set base zoom
    const initialZoom = scaleToFitViewport();
    setZoom(initialZoom);
    setBaseZoom(initialZoom);
    // get artboard size
    const artboardHeight = props.artboard.frame.height * initialZoom;
    const artboardWidth = props.artboard.frame.width * initialZoom;
    const artboardHeightMid = artboardHeight / 2;
    const artboardWidthMid = artboardWidth / 2;
    // get and set offsets
    const canvasCenter = canvasSize / 2;
    const leftOffset = canvasCenter - artboardWidthMid;
    const topOffset = canvasCenter - artboardHeightMid;
    const rightRemainder = viewPortSize.width - artboardWidth;
    const bottomRemainder = viewPortSize.height - artboardHeight;
    // set center scroll
    window.scrollTo(leftOffset - (rightRemainder / 2), topOffset - (bottomRemainder / 2));
    setCenterScroll([leftOffset - (rightRemainder / 2), topOffset - (bottomRemainder / 2)]);
  }, [viewPortSize]);

  return (
    <div
      className='c-app'
      tabIndex={-1}
      ref={app}
      onKeyDown={handleKeyPress}>
      <Topbar
        zoom={zoom}
        setZoom={setZoom}
        baseZoom={baseZoom}
        centerScroll={centerScroll} />
      {/* <Sidebar
        selection={selection}
        hover={hover}
        images={props.images}
        svgs={props.svgs} /> */}
      <Canvas
        {...props}
        zoom={zoom}
        setZoom={setZoom}
        selection={selection}
        setSelection={setSelection}
        hover={hover}
        setHover={setHover}
        leftScroll={leftScroll}
        topScroll={topScroll}
        viewPortSize={viewPortSize}
        canvasSize={canvasSize} />
    </div>
  );
}

export default App;
