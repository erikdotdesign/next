import React from 'react';
import SidebarStyles from './SidebarStyles';
import SidebarNotes from './SidebarNotes';

interface SidebarRightProps {
  selection: srm.AppLayer | null;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
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
    </div>
  )
};

export default SidebarRight;