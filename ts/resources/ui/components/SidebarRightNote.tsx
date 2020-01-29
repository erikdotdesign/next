import React, { useState, useEffect } from 'react';
import IconClose from './IconClose';
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
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className='c-sidebar-right__note'
          style={
            hovering
            ? {
                background:
                  theme.theme === 'dark'
                  ? theme.background.darkest
                  : theme.background.dark
              }
            : {background: theme.background.darker}
          }>
          <div
            className='c-sidebar-right__note-content'
            style={{color: theme.text.lighter}}>
            <span style={{color: theme.text.base}}>
              { note }
            </span>
            {
              composing
              ? <button
                  className='c-sidebar-right__note-remove'
                  onClick={onClick}>
                  <IconClose />
                </button>
              : null
            }
          </div>
        </li>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarRightNote;