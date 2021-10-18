import React from 'react';
import TopBarButton from './TopBarButton';
import IconSave from './IconSave';

interface TopBarSaveProps {
  composing: boolean;
  notes: next.Note[];
  appTheme: next.Theme;
}

const TopBarSave = (props: TopBarSaveProps) => {
  const { composing, notes, appTheme } = props;
  const save = () => {
    // @ts-ignore
    window.postMessage('save', JSON.stringify({
      notes: notes,
      theme: appTheme
    }));
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