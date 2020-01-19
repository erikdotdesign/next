import React from 'react';
import TopBarButton from './TopBarButton';
import IconZoomOut from './IconZoomOut';
import IconZoomIn from './IconZoomIn';

interface TopBarZoomProps {
  zoom: number;
  setZoom: any;
}

const TopBarZoom = (props: TopBarZoomProps) => {
  const { zoom, setZoom } = props;
  const zoomOut = () => {
    if (zoom - 0.1 > 0) {
      setZoom(zoom - 0.1);
    }
  };
  const zoomIn = () => {
    if (zoom + 0.1 < 5) {
      setZoom(zoom + 0.1);
    }
  };
  return (
    <div className='c-topbar__control'>
      <TopBarButton
        onClick={zoomOut}
        className={'c-topbar__button--zoom-out'}
        icon={<IconZoomOut />} />
      <div className='c-topbar__zoom-status'>
        <span>{`${Math.round(props.zoom * 100)}%`}</span>
      </div>
      <TopBarButton
        onClick={zoomIn}
        className={'c-topbar__button--zoom-in'}
        icon={<IconZoomIn />} />
    </div>
  );
}

export default TopBarZoom;