import React, { useState } from 'react';
import SidebarRightNoteRemove from './SidebarRightNoteRemove';
import ThemeContext from './ThemeContext';

interface SidebarRightNoteProps {
  note: string;
  index: number;
  composing: boolean;
  onClick(): void;
}

const SidebarRightNote = (props: SidebarRightNoteProps) => {
  const [hovering, setHovering] = useState(false);
  const { note, composing, onClick } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <li
          onMouseOver={() => setHovering(true)}
          onMouseOut={() => setHovering(false)}
          className='c-sidebar-right__note'
          style={
            hovering
            ? {background: theme.background.z3}
            : {background: theme.background.z1}
          }>
          <div
            className='c-sidebar-right__note-content'
            style={{color: theme.text.lighter}}>
            <span style={{color: theme.text.base}}>
              { note }
            </span>
            <SidebarRightNoteRemove
              onClick={onClick}
              composing={composing} />
          </div>
        </li>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarRightNote;