import React from 'react';
import TopBarButton from './TopBarButton';
import IconRefresh from './IconRefresh';

interface TopBarRefreshProps {
  baseZoom: any;
  setZoom: any;
  scrollToCenter: any;
}

const TopBarRefresh = (props: TopBarRefreshProps) => {
  const { baseZoom, setZoom, scrollToCenter } = props;
  const refresh = () => {
    setZoom(baseZoom);
    scrollToCenter();
  };
  return (
    <div className='c-topbar__control'>
      <TopBarButton
        onClick={refresh}
        className={'c-topbar__button--refresh'}
        icon={<IconRefresh />} />
    </div>
  );
}

export default TopBarRefresh;