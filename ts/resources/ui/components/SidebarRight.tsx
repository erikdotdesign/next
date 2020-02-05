import React from 'react';
import Sidebar from './Sidebar';
import SidebarRightStyles from './SidebarRightStyles';
import SidebarRightNotes from './SidebarRightNotes';
import SidebarRightInput from './SidebarRightInput';

interface SidebarRightProps {
  ready: boolean;
  selection: srm.AppLayer | null;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  notes: srm.Note[];
  composing: boolean;
  setNotes(notes: srm.Note[]): void;
}

const SidebarRight = (props: SidebarRightProps) => {
  const { selection, ready, images, svgs, notes, setNotes, composing } = props;
  return (
    <Sidebar side='right'>
      <SidebarRightStyles
        selection={selection}
        images={images}
        svgs={svgs} />
      <SidebarRightNotes
        selection={selection}
        notes={notes}
        setNotes={setNotes}
        composing={composing} />
      {
        composing && ready
        ? <SidebarRightInput
            selection={selection}
            notes={notes}
            setNotes={setNotes} />
        : null
      }
    </Sidebar>
  )
};

export default SidebarRight;