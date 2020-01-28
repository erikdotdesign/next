import React from 'react';
import TopBarSave from './TopBarSave';
import TopBarRefresh from './TopBarRefresh';
import TopBarZoom from './TopBarZoom';
import TopBarZoomReset from './TopBarZoomReset';

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
    <div className='c-topbar-wrap'>
      <div className='c-topbar'>
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
  );
}

export default TopBar;