import React, { useRef, useState, useEffect } from 'react';
import SidebarRight from './SidebarRight';
import SidebarLeft from './SidebarLeft';
import Canvas from './Canvas';
import TopBar from './TopBar';
import ThemeProvider from './ThemeProvider';
import ThemeContext from './ThemeContext';

interface AppProps {
  artboard: srm.Artboard;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  notes: srm.Note[];
  theme: srm.Theme;
  composing: boolean;
}

const App = (props: AppProps) => {
  const app = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [appTheme, setAppTheme] = useState<srm.Theme>(props.theme);
  // selection and hover
  const [groupSelectionNest, setGroupSelectionNest] = useState<srm.Group[] | null>(null);
  const [groupSelection, setGroupSelection] = useState<srm.Group | null>(null);
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
  const [notes, setNotes] = useState<srm.Note[]>(props.notes);

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

  // update groupSelectionNest on group selection change
  useEffect(() => {
    if (groupSelection) {
      // check if groupSelectionNest exists
      if (groupSelectionNest) {
        // if groupSelectionNest exists,
        // check if it contains groupSelection
        const nestContainsGroup = groupSelectionNest.find((group: srm.Group) => {
          return group.id === groupSelection.id;
        });
        // if groupSelectionNest contains groupSelection,
        // create new groupSelectionNest with all the parents up to groupSelection
        if (nestContainsGroup) {
          let i = 0;
          let newNest = [];
          while (groupSelectionNest[i].id !== groupSelection.id) {
            newNest.push(groupSelectionNest[i]);
            i++;
          }
          setGroupSelectionNest([...newNest, groupSelection]);
        } else {
          // if groupSelectionNest does not contain groupSelection,
          // add groupSelection to the end of groupSelectionNest
          setGroupSelectionNest([...groupSelectionNest, groupSelection]);
        }
      } else {
        // if groupSelectionNest does not exist,
        // initialize it with groupSelection
        setGroupSelectionNest([groupSelection]);
      }
    }
  }, [groupSelection]);

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
    <ThemeProvider theme={appTheme}>
      <ThemeContext.Consumer>
        {(theme) => (
          <div
            className='c-app'
            tabIndex={-1}
            ref={app}
            onKeyDown={handleKeyPress}
            style={{
              background: theme.background.z1
            }}>
            <TopBar
              zoom={zoom}
              setZoom={setZoom}
              baseZoom={baseZoom}
              notes={notes}
              scrollToCenter={scrollToCenter}
              appTheme={appTheme}
              setAppTheme={setAppTheme}
              composing={props.composing} />
            <SidebarLeft
              selection={selection}
              setSelection={setSelection}
              hover={hover}
              setHover={setHover}
              notes={notes}
              groupSelection={groupSelection}
              setGroupSelection={setGroupSelection}
              groupSelectionNest={groupSelectionNest}
              setGroupSelectionNest={setGroupSelectionNest}
              artboard={props.artboard} />
            <SidebarRight
              selection={selection}
              images={props.images}
              svgs={props.svgs}
              notes={notes}
              setNotes={setNotes}
              composing={props.composing} />
            <Canvas
              {...props}
              ready={ready}
              zoom={zoom}
              setZoom={setZoom}
              selection={selection}
              setSelection={setSelection}
              groupSelection={groupSelection}
              setGroupSelection={setGroupSelection}
              groupSelectionNest={groupSelectionNest}
              setGroupSelectionNest={setGroupSelectionNest}
              hover={hover}
              setHover={setHover} />
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
