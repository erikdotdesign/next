import React from 'react';
import ThemeContext from './ThemeContext';

interface IconTriRightProps {
  style?: any;
}

const IconTriRight = (props: IconTriRightProps) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <path
          d='M10 17l5-5-5-5v10z'
          style={{
            fill: theme.text.base,
            ...props.style
          }} />
      </svg>
    )}
  </ThemeContext.Consumer>
);

export default IconTriRight;
