import React, { useRef } from 'react';
import ThemeContext from './ThemeContext';
import gsap from 'gsap';

interface SidebarRightInputProps {
  note: string;
  setNote(note: string): void;
}

const SidebarRightTextArea = (props: SidebarRightInputProps) => {
  const input = useRef<HTMLTextAreaElement>(null);
  const border = useRef<HTMLDivElement>(null);
  const { note, setNote } = props;
  const handleChange = (e: any) => {
    setNote(e.target.value);
  }
  const handleFocus = () => {
    gsap.to(border.current!, {scale: 1, duration: 0.25});
  }
  const handleBlur = () => {
    gsap.to(border.current!, {scale: 0, duration: 0.25});
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className='c-sidebar-right__input-wrap'>
          <textarea
            className='c-sidebar-right__input'
            ref={input}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
          <div
            ref={border}
            className='c-sidebar-right__input-bb'
            style={{background: theme.palette.primary}} />
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarRightTextArea;