import React from 'react';
import TopBarButton from './TopBarButton';
import IconZoomOut from './IconZoomOut';
import IconZoomIn from './IconZoomIn';
import ThemeContext from './ThemeContext';

interface TopBarZoomProps {
  zoom: number;
  setZoom(zoom: number): void;
}

const TopBarZoom = (props: TopBarZoomProps) => {
  const { zoom, setZoom } = props;
  const zoomOut = (): void => {
    if (zoom - 0.1 > 0) {
      setZoom(zoom - 0.1);
    }
  };
  const zoomIn = (): void => {
    if (zoom + 0.1 < 5) {
      setZoom(zoom + 0.1);
    }
  };
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className='c-topbar__control'>
          <TopBarButton
            onClick={zoomOut}
            className={'c-topbar__button--zoom-out'}
            icon={<IconZoomOut />} />
          <div className='c-topbar__zoom-status'>
            <span style={{color: theme.text.base}}>
              {`${Math.round(props.zoom * 100)}%`}
            </span>
          </div>
          <TopBarButton
            onClick={zoomIn}
            className={'c-topbar__button--zoom-in'}
            icon={<IconZoomIn />} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default TopBarZoom;