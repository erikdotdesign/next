import React from 'react';
import { createDimWidthStyles, createDimHeightStyles } from '../../utils/hoverStyles';

interface HoverDimsProps {
  hover: any;
  artboard: any;
  zoom: number;
}

const HoverDims = (props: HoverDimsProps) => (
  <div>
    <div
      className='c-selection__dim'
      style={createDimWidthStyles(props.hover.frame, props.artboard.frame, props.zoom)}>
      {props.hover.frame.width}
    </div>
    <div
      className='c-selection__dim'
      style={createDimHeightStyles(props.hover.frame, props.artboard.frame, props.zoom)}>
      {props.hover.frame.height}
    </div>
  </div>
);

export default HoverDims;
