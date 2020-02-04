import React, { useState } from 'react';
import IconClose from './IconClose';
import ThemeContext from './ThemeContext';

interface SidebarRightNoteProps {
  composing: boolean;
  onClick(): void;
}

const SidebarRightNoteRemove = (props: SidebarRightNoteProps) => {
  const [hovering, setHovering] = useState(false);
  const { composing, onClick } = props;
  return (
    composing
    ? <ThemeContext.Consumer>
        {(theme) => (
          <button
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
            className='c-sidebar-right__note-remove'
            onClick={onClick}
            style={
              hovering
              ? {background: theme.palette.primary}
              : {background: 'none'}
            }>
            <IconClose
              style={
                hovering
                ? {fill: theme.text.onPrimary}
                : {fill: theme.text.base}
              } />
          </button>
        )}
      </ThemeContext.Consumer>
    : null
  )
};

export default SidebarRightNoteRemove;