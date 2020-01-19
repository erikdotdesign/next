import React from 'react';
import TopBarButton from './TopBarButton';
import IconNotesOn from './IconNotesOn';
import IconNotesOff from './IconNotesOff';

interface TopBarNotesProps {
  showNotes: boolean;
  setShowNotes: any;
}

const TopBarNotes = (props: TopBarNotesProps) => {
  const { showNotes, setShowNotes } = props;
  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };
  return (
    <div className='c-topbar__control'>
      {
        showNotes
        ? <TopBarButton
            onClick={toggleNotes}
            className={'c-topbar__button--notes-on'}
            icon={<IconNotesOn />} />
        : <TopBarButton
            onClick={toggleNotes}
            className={'c-topbar__button--notes-off'}
            icon={<IconNotesOff />} />
      }
    </div>
  );
}

export default TopBarNotes;