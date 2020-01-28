import React, { useRef, useState } from 'react';
import SidebarRightSwatches from './SidebarRightSwatches';

interface SidebarRightStylesValueProps {
  value: string;
}

const SidebarRightStylesValue = (props: SidebarRightStylesValueProps) => {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
  const copyToClipBoard = () => {
    if (textInput.current) {
      textInput.current.focus();
      textInput.current.select();
      document.execCommand('copy');
      setCopied(true);
    }
  }
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
      className='c-sidebar-styles__value'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <input
        ref={textInput}
        onClick={copyToClipBoard}
        type='text'
        readOnly
        value={props.value} />
      {
        hovering && !copied
        ? <div className='c-sidebar-styles__value-copy'>
            <span>Copy</span>
          </div>
        : null
      }
      {
        copied
        ? <div className='c-sidebar-styles__value-copy c-sidebar-styles__value-copy--copied'>
            <span>Copied!</span>
          </div>
        : null
      }
      <SidebarRightSwatches value={props.value} />
    </div>
  );
}

export default SidebarRightStylesValue;