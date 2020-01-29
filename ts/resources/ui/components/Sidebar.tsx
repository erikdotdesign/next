import React from 'react';
import ThemeContext from './ThemeContext';

type SiebarSide = 'left' | 'right';

interface SidebarProps {
  children: React.ReactNode;
  side: SiebarSide;
}

const Sidebar = (props: SidebarProps) => {
  const { children, side } = props;
  const shadowOffset = side === 'left' ? '1px' : '-1px';
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className={`c-sidebar c-sidebar--${side}`}
          style={{
            background: theme.background.darker,
            boxShadow: `${shadowOffset} 0px 0px 0px ${theme.background.lighter}`
          }}>
          { children }
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default Sidebar;