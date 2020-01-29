import React from 'react';
import ThemeContext from './ThemeContext';

interface SidebarHeaderProps {
  text: string;
}

const SidebarHeader = (props: SidebarHeaderProps) => {
  const { text } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className='c-sidebar__header'
          style={{
            background:
              theme.theme === 'dark'
              ? theme.background.dark
              : theme.background.darker,
            boxShadow:
              theme.theme === 'dark'
              ? `
                  0px 1px 0px 0px ${theme.background.light} inset,
                  0px -1px 0px 0px ${theme.background.light} inset
                `
              : `
                  0px 1px 0px 0px ${theme.background.base} inset,
                  0px -1px 0px 0px ${theme.background.base} inset
                `
          }}>
          <span>{text}</span>
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarHeader;