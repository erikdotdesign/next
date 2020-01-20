import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import { createHoveredStyles } from '../styles/hoverStyles';

interface HoverProps {
  hover: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text;
  selection: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null;
  artboard: srm.Artboard;
  zoom: number;
}

const Hover = (props: HoverProps) => {
  const { hover, selection, artboard, zoom } = props;
  const { frame } = hover;
  return (
    <div
      className='c-layer c-layer--hover'
      style={createHoveredStyles(frame, zoom)}>
      {
        selection
        ? <HoverRules
            hover={hover}
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
