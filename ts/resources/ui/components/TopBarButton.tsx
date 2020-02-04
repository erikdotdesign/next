import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

interface TopBarButtonProps {
  className?: string;
  icon: React.ReactNode;
  onClick(): void;
}

const TopBarButton = (props: TopBarButtonProps) => {
  const { onClick, icon, className } = props;
  const [hovering, setHovering] = useState(false);
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          onMouseOver={() => setHovering(true)}
          onMouseOut={() => setHovering(false)}
          className={`c-topbar__button ${className}`}
          onClick={onClick}>
          {icon}
          <div
            className='c-topbar__button-bg'
            style={{background: theme.background.z3}} />
          <div
            className='c-topbar__button-bb'
            style={{
              background:
              hovering
              ? theme.palette.primary
              : 'none'
            }} />
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default TopBarButton;