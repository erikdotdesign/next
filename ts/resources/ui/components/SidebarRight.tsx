import React from 'react';
import SidebarRightStyles from './SidebarRightStyles';
import SidebarRightNotes from './SidebarRightNotes';
import SidebarRightInput from './SidebarRightInput';
import ThemeContext from './ThemeContext';

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
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className='c-sidebar c-sidebar--right'
          style={{
            background:
              theme.theme === 'dark'
              ? theme.background.darker
              : theme.background.dark,
            boxShadow:
              theme.theme === 'dark'
              ? `-1px 0px 0px 0px ${theme.background.light}`
              : `-1px 0px 0px 0px ${theme.background.base}`
          }}>
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
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarRight;