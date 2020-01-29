import React from 'react';
import ThemeContext from './ThemeContext';

interface IconSaveProps {
  style?: any;
}

const IconSave = (props: IconSaveProps) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <path
          d='M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z'
          style={{
            fill: theme.text.base,
            ...props.style
          }} />
      </svg>
    )}
  </ThemeContext.Consumer>
);

export default IconSave;
