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
  const handleMouseEnter = () => {
    setHovering(true);
  }
  const handleMouseLeave = () => {
    setHovering(false);
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`c-topbar__button ${className}`}
          onClick={onClick}>
          {icon}
          <div
            className='c-topbar__button-bg'
            style={{background: theme.background.darker}} />
          <div className='c-topbar__button-bb' />
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default TopBarButton;