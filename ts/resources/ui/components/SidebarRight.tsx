import React from 'react';
import SidebarStyles from './SidebarStyles';
import SidebarNotes from './SidebarNotes';
import SidebarRightInput from './SidebarRightInput';

interface SidebarRightProps {
  selection: srm.AppLayer | null;
  images: srm.AppAsset[];
  svgs: srm.AppAsset[];
  notes: srm.Notes;
  edit: boolean;
  composing: boolean;
  setNotes(notes: srm.Notes): void;
}

const SidebarRight = (props: SidebarRightProps) => {
  const { selection, images, svgs, notes, setNotes, edit, composing } = props;
  return (
    <div className='c-sidebar c-sidebar--right'>
      <SidebarStyles
        selection={selection}
        images={images}
        svgs={svgs} />
      <SidebarNotes
        selection={selection}
        notes={notes}
        setNotes={setNotes}
        edit={edit}
        composing={composing} />
      {
        composing
        ? <SidebarRightInput
            selection={selection}
            notes={notes}
            setNotes={setNotes} />
        : null
      }
    </div>
  )
};

export default SidebarRight;