import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import ThemeContext from './ThemeContext';
import { createHoveredStyles } from '../styles/hoverStyles';

interface HoverProps {
  hover: next.AppLayer;
  selection: next.AppLayer | null;
  artboard: next.Artboard;
  zoom: number;
}

const Hover = (props: HoverProps) => {
  const { hover, selection, artboard, zoom } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className='c-layer c-layer--hover'
          style={createHoveredStyles(hover, artboard, zoom, theme.palette.primary)}>
          {
            selection
            ? <HoverRules
                hover={hover}
                artboard={artboard}
                selection={selection}
                zoom={zoom} />
            : <HoverDims
                hover={hover}
                artboard={artboard}
                zoom={zoom} />
          }
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default Hover;
