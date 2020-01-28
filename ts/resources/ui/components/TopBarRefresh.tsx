import React from 'react';
import TopBarButton from './TopBarButton';
import IconRefresh from './IconRefresh';

interface TopBarRefreshProps {
  scrollToCenter(): void;
}

const TopBarRefresh = (props: TopBarRefreshProps) => {
  const { scrollToCenter } = props;
  return (
    <div className='c-topbar__control'>
      <TopBarButton
        onClick={() => scrollToCenter()}
        className={'c-topbar__button--refresh'}
        icon={<IconRefresh />} />
    </div>
  );
}

export default TopBarRefresh;