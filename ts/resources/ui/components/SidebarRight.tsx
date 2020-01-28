import React from 'react';
import SidebarRightStyles from './SidebarRightStyles';
import SidebarRightNotes from './SidebarRightNotes';
import SidebarRightInput from './SidebarRightInput';

interface SidebarRightProps {
  selection: srm.AppLayer | null;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  notes: srm.Note[];
  composing: boolean;
  setNotes(notes: srm.Note[]): void;
}

const SidebarRight = (props: SidebarRightProps) => {
  const { selection, images, svgs, notes, setNotes, composing } = props;
  return (
    <div className='c-sidebar c-sidebar--right'>
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