import React, { useRef } from 'react';
import ThemeContext from './ThemeContext';

interface SidebarRightStylesValueProps {
  value: string;
  setCopied(copied: boolean): void;
}

const SidebarRightStylesInput = (props: SidebarRightStylesValueProps) => {
  const { value, setCopied } = props;
  const textInput = useRef<HTMLInputElement>(null);
  const copyToClipBoard = () => {
    if (textInput.current) {
      textInput.current.focus();
      textInput.current.select();
      document.execCommand('copy');
      setCopied(true);
    }
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <input
          className='c-sidebar-right__style-input'
          ref={textInput}
          onClick={copyToClipBoard}
          type='text'
          readOnly
          value={value}
          style={{
            color: theme.text.base,
            background:
              theme.theme === 'dark'
              ? theme.background.darker
              : theme.background.dark,
          }} />
      )}
    </ThemeContext.Consumer>
  );
}

export default SidebarRightStylesInput;