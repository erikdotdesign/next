import React from 'react';
import ThemeContext from './ThemeContext';

interface LayerDimProps {
  dim: number;
  style?: any;
}

const LayerDim = (props: LayerDimProps) => {
  const { dim, style } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className='c-selection__dim'
          style={{
            background: theme.palette.primary,
            color: theme.text.onPrimary,
            ...style
          }}>
          { dim }
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default LayerDim;
