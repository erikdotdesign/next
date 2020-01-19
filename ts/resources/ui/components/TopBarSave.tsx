import React from 'react';
import TopBarButton from './TopBarButton';
import IconSave from './IconSave';

interface TopBarSaveProps {
  composing: boolean;
  notes: any;
}

const TopBarSave = (props: TopBarSaveProps) => {
  const { composing, notes } = props;
  const save = () => {
    // @ts-ignore
    window.postMessage('save', JSON.stringify(notes));
  };
  return (
    composing
    ? <div className='c-topbar__control'>
        <TopBarButton
          onClick={save}
          className={'c-topbar__button--save'}
          icon={<IconSave />} />
      </div>
    : null
  );
}

export default TopBarSave;