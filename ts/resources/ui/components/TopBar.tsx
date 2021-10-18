import React from 'react';
import TopBarTheme from './TopBarTheme';
import TopBarSave from './TopBarSave';
import TopBarRefresh from './TopBarRefresh';
import TopBarZoom from './TopBarZoom';
import TopBarZoomReset from './TopBarZoomReset';
import ThemeContext from './ThemeContext';

interface TopbarProps {
  baseZoom: number;
  zoom: number;
  notes: next.Note[];
  composing: boolean;
  appTheme: next.Theme;
  setAppTheme(appTheme: next.Theme): void;
  setZoom(zoom: number): void;
  scrollToCenter(): void;
}

const TopBar = (props: TopbarProps) => {
  const { scrollToCenter, zoom, appTheme, setAppTheme, baseZoom, setZoom, notes, composing } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className='c-topbar-wrap'>
          <div
            className='c-topbar'
            style={{
              background: theme.background.z2,
              boxShadow: `0px 1px 0px 0px ${theme.background.z5}`
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
              <div className='c-topbar__right'>
                <TopBarTheme
                  appTheme={appTheme}
                  setAppTheme={setAppTheme} />
                <TopBarSave
                  composing={composing}
                  notes={notes}
                  appTheme={appTheme} />
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default TopBar;