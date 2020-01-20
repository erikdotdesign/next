import React from 'react';
import TopBarSelection from './TopBarSelection';
import TopBarSave from './TopBarSave';
import TopBarEdit from './TopBarEdit';
import TopBarNotes from './TopBarNotes';
import TopBarRefresh from './TopBarRefresh';
import TopBarZoom from './TopBarZoom';

interface TopbarProps {
  selection: srm.AppLayer | null;
  baseZoom: number;
  zoom: number;
  notes: srm.Notes;
  showNotes: boolean;
  edit: boolean;
  composing: boolean;
  setEdit(edit: boolean): void;
  setShowNotes(showNotes: boolean): void;
  setZoom(zoom: number): void;
  scrollToCenter(): void;
}

const TopBar = (props: TopbarProps) => {
  const { scrollToCenter, zoom, baseZoom, setZoom, setShowNotes, notes, showNotes, edit, setEdit, composing, selection } = props;
  return (
    <div className='c-topbar-wrap'>
      <div className='c-topbar'>
        <TopBarSelection
          selection={selection} />
        <div className='c-topbar__controls'>
          <TopBarSave
            composing={composing}
            notes={notes} />
          <TopBarEdit
            composing={composing}
            edit={edit}
            setEdit={setEdit} />
          <TopBarNotes
            showNotes={showNotes}
            setShowNotes={setShowNotes} />
          <TopBarRefresh
            baseZoom={baseZoom}
            setZoom={setZoom}
            scrollToCenter={scrollToCenter} />
          <TopBarZoom
            zoom={zoom}
            setZoom={setZoom} />
        </div>
      </div>
    </div>
  );
}

export default TopBar;