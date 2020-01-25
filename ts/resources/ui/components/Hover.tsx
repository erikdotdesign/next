import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import { createHoveredStyles } from '../styles/hoverStyles';

interface HoverProps {
  hover: srm.AppLayer;
  selection: srm.AppLayer | null;
  artboard: srm.Artboard;
  zoom: number;
}

const Hover = (props: HoverProps) => {
  const { hover, selection, artboard, zoom } = props;
  return (
    <div
      className='c-layer c-layer--hover'
      style={createHoveredStyles(hover, artboard, zoom)}>
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
  )
};

export default Hover;
