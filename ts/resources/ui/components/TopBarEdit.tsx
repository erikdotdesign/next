import React from 'react';
import TopBarButton from './TopBarButton';
import IconEditOn from './IconEditOn';
import IconEditOff from './IconEditOff';

interface TopBarEditProps {
  composing: boolean;
  edit: boolean;
  setEdit(edit: boolean): void;
}

const TopBarEdit = (props: TopBarEditProps) => {
  const { composing, edit, setEdit } = props;
  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    composing
    ? <div className='c-topbar__control'>
        {
          edit
          ? <TopBarButton
              onClick={toggleEdit}
              className={'c-topbar__button--edit-on'}
              icon={<IconEditOn />} />
          : <TopBarButton
              onClick={toggleEdit}
              className={'c-topbar__button--edit-off'}
              icon={<IconEditOff />} />
        }
      </div>
    : null
  );
}

export default TopBarEdit;