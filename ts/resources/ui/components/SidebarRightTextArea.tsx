import React, { useRef } from 'react';
import ThemeContext from './ThemeContext';

interface SidebarRightInputProps {
  note: string;
  setNote(note: string): void;
}

const SidebarRightTextArea = (props: SidebarRightInputProps) => {
  const input = useRef<HTMLTextAreaElement>(null);
  const { note, setNote } = props;
  const handleChange = (e: any) => {
    setNote(e.target.value);
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <textarea
          className='c-sidebar-right__input'
          ref={input}
          placeholder='Compose note...'
          value={note}
          onChange={handleChange}
          style={{
            color: theme.text.base,
            background: theme.background.z2,
            boxShadow: `
              0px 1px 0px 0px ${theme.background.z4} inset,
              0px -1px 0px 0px ${theme.background.z4} inset
            `
          }} />
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarRightTextArea;