import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Topbar from './Topbar';

interface AppProps {
  artboard: any;
  images: any;
  svgs: any;
}

const App = (props: AppProps) => {
  const canvasSize = 20000;
  const [selection, setSelection] = useState('');
  const [hover, setHover] = useState('');
  const [zoom, setZoom] = useState(1);
  const [baseZoom, setBaseZoom] = useState(1);
  const [leftScroll, setLeftScroll] = useState(0);
  const [topScroll, setTopScroll] = useState(0);
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
    const viewportWidth = window.innerWidth - 320;
    // subtract artboard padding + top rule height
    const viewportHeight = window.innerHeight - 24 * 3;
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

  useEffect(() => {
    // set scroll listener
    window.addEventListener('scroll', handleScroll);
    // set reszie listener
    window.addEventListener('resize', handleResize);
    // set viewportsize
    setViewPortSize(getViewPortSize());
  }, []);

  useEffect(() => {
    // get initial zoom and new dims
    const initialZoom = scaleToFitViewport();
    // set initial zoom
    setZoom(initialZoom);
    setBaseZoom(initialZoom);
    // scroll to center or canvas
    window.scrollTo(canvasSize / 2, canvasSize / 2);
  }, [viewPortSize]);

  return (
    <div className='c-app'>
      <Topbar
        zoom={zoom}
        setZoom={setZoom}
        baseZoom={baseZoom}
        canvasSize={canvasSize} />
      <Sidebar
        selection={selection}
        hover={hover}
        images={props.images}
        svgs={props.svgs} />
      <Canvas
        {...props}
        zoom={zoom}
        setZoom={setZoom}
        baseZoom={baseZoom}
        setBaseZoom={setBaseZoom}
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
