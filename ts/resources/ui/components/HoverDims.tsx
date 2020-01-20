import React from 'react';
import { createDimWidthStyles, createDimHeightStyles } from '../styles/hoverStyles';

interface HoverDimsProps {
  hover: srm.AppLayer;
  artboard: srm.Artboard;
  zoom: number;
}

const HoverDims = (props: HoverDimsProps) => {
  const { hover, artboard, zoom } = props;
  return (
    <div>
      <div
        className='c-selection__dim'
        style={createDimWidthStyles(hover.frame, artboard.frame, zoom)}>
        {hover.frame.width}
      </div>
      <div
        className='c-selection__dim'
        style={createDimHeightStyles(hover.frame, artboard.frame, zoom)}>
        {hover.frame.height}
      </div>
    </div>
  )
};

export default HoverDims;
