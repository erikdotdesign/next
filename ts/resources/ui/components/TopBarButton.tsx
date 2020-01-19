import React from 'react';

interface TopBarButtonProps {
  className?: string;
  onClick: any;
  icon: any;
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