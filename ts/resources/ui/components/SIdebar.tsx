import React from 'react';
import SidebarStyles from './SidebarStyles';
import SidebarNotes from './SidebarNotes';

interface SidebarProps {
  selection: any;
  images: any;
  svgs: any;
  notes: any;
  setNotes: any;
  edit: boolean;
  composing: boolean;
}

const Sidebar = (props: SidebarProps) => {
  const { selection, images, svgs, notes, setNotes, edit, composing } = props;
  return (
    <div className='c-sidebar'>
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

export default Sidebar;