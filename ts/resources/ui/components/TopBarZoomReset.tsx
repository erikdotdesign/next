import React from 'react';
import TopBarButton from './TopBarButton';
import IconZoomReset from './IconZoomReset';

interface TopBarZoomResetProps {
  baseZoom: number;
  setZoom(zoom: number): void;
}

const TopBarZoomReset = (props: TopBarZoomResetProps) => {
  const { baseZoom, setZoom } = props;
  return (
    <div className='c-topbar__control'>
      <TopBarButton
        onClick={() => setZoom(baseZoom)}
        className={'c-topbar__button--zoom-reset'}
        icon={<IconZoomReset />} />
    </div>
  );
}

export default TopBarZoomReset;