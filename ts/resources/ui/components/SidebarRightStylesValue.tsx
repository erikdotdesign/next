import React, { useState } from 'react';
import SidebarRightStylesCopy from './SidebarRightStylesCopy';
import SidebarRightStylesCopied from './SidebarRightStylesCopied';
import SidebarRightStylesInput from './SidebarRightStylesInput';
import SidebarRightSwatches from './SidebarRightSwatches';

interface SidebarRightStylesValueProps {
  value: string;
  prop: string;
}

const SidebarRightStylesValue = (props: SidebarRightStylesValueProps) => {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleMouseEnter = () => {
    setHovering(true);
  }
  const handleMouseLeave = () => {
    setHovering(false);
    if (copied) {
      setCopied(false);
    }
  }
  return (
    <div
      className='c-sidebar-right__style-value'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <SidebarRightStylesInput
        value={props.value}
        setCopied={setCopied} />
      <SidebarRightStylesCopy
        hovering={hovering}
        copied={copied} />
      <SidebarRightStylesCopied
        copied={copied} />
      <SidebarRightSwatches
        value={props.value}
        prop={props.prop} />
    </div>
  );
}

export default SidebarRightStylesValue;