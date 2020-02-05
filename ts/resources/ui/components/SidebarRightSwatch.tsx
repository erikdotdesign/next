import React from 'react';

interface SidebarRightSwatchProps {
  value: string;
  image?: boolean;
}

const SidebarRightSwatch = (props: SidebarRightSwatchProps) => {
  return (
    <div
      style={{background: props.value}}
      className={`c-sidebar-right__swatch ${
        props.image
        ? 'c-sidebar-right__swatch--image'
        : null
      }`} />
  );
}

export default SidebarRightSwatch;