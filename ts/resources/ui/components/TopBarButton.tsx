import React from 'react';

interface TopBarButtonProps {
  className?: string;
  icon: React.ReactNode;
  onClick(): void;
}

const TopBarButton = (props: TopBarButtonProps) => {
  const { onClick, icon, className } = props;
  return (
    <button
      className={`c-topbar__button ${className}`}
      onClick={onClick}>
      {icon}
      <div className='c-topbar__button-bb' />
    </button>
  );
}

export default TopBarButton;