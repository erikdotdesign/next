import React from 'react';
import ThemeContext from './ThemeContext';

interface IconZoomInProps {
  style?: any;
}

const IconZoomIn = (props: IconZoomInProps) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <path
          d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
          style={{
            fill: theme.text.base,
            ...props.style
          }} />
      </svg>
    )}
  </ThemeContext.Consumer>
);

export default IconZoomIn;
