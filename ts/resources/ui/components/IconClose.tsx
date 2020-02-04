import React from 'react';
import ThemeContext from './ThemeContext';

interface IconCloseProps {
  style?: any;
}

const IconClose = (props: IconCloseProps) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <path
          d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
          style={{
            fill: theme.text.base,
            ...props.style
          }} />
      </svg>
    )}
  </ThemeContext.Consumer>
);

export default IconClose;
