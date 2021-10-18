import React from 'react';
import LayerDim from './LayerDim';
import { createDimWidthStyles, createDimHeightStyles } from '../styles/hoverStyles';

interface HoverDimsProps {
  hover: next.AppLayer;
  artboard: next.Artboard;
  zoom: number;
}

const HoverDims = (props: HoverDimsProps) => {
  const { hover, artboard, zoom } = props;
  return (
    <div>
      <LayerDim
        style={createDimWidthStyles(hover.frame, artboard.frame, zoom)}
        dim={hover.frame.width} />
      <LayerDim
        style={createDimHeightStyles(hover.frame, artboard.frame, zoom)}
        dim={hover.frame.height} />
    </div>
  )
};

export default HoverDims;
