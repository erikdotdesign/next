import React from 'react';
import ThemeContext from './ThemeContext';

interface SidebarRightStylesCopyProps {
  hovering: boolean;
  copied: boolean;
}

const SidebarRightStylesCopy = (props: SidebarRightStylesCopyProps) => {
  const { hovering, copied } = props;
  return (
    hovering && !copied
    ? <ThemeContext.Consumer>
        {(theme) => (
          <div
            className='c-sidebar-right__style-copy'
            style={{color: theme.text.base}}>
            <span className='c-sidebar-right__style-copy-text'>
              Copy
            </span>
            <div
              className='c-sidebar-right__style-copy-bg'
              style={{
                background:
                  theme.theme === 'dark'
                  ? theme.background.darkest
                  : theme.background.light
              }} />
          </div>
        )}
      </ThemeContext.Consumer>
    : null
  );
}

export default SidebarRightStylesCopy;