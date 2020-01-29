import React from 'react';
import ThemeContext from './ThemeContext';

interface IconZoomOutProps {
  style?: any;
}

const IconZoomOut = (props: IconZoomOutProps) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <path
          d='M19 13H5v-2h14v2z'
          style={{
            fill: theme.text.base,
            ...props.style
          }} />
      </svg>
    )}
  </ThemeContext.Consumer>
);

export default IconZoomOut;
