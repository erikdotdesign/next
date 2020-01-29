import React from 'react';
import TopBarSave from './TopBarSave';
import TopBarRefresh from './TopBarRefresh';
import TopBarZoom from './TopBarZoom';
import TopBarZoomReset from './TopBarZoomReset';
import ThemeContext from './ThemeContext';

interface TopbarProps {
  baseZoom: number;
  zoom: number;
  notes: srm.Note[];
  composing: boolean;
  setZoom(zoom: number): void;
  scrollToCenter(): void;
}

const TopBar = (props: TopbarProps) => {
  const { scrollToCenter, zoom, baseZoom, setZoom, notes, composing } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className='c-topbar-wrap'>
          <div
            className='c-topbar'
            style={{
              background: theme.background.dark,
              boxShadow: `0px 1px 0px 0px ${theme.background.lighter}`
            }}>
            <div className='c-topbar__controls'>
              <TopBarRefresh
                scrollToCenter={scrollToCenter} />
              <TopBarZoom
                zoom={zoom}
                setZoom={setZoom} />
              <TopBarZoomReset
                baseZoom={baseZoom}
                setZoom={setZoom} />
              <TopBarSave
                composing={composing}
                notes={notes} />
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default TopBar;