import React from 'react';
import { createDimWidthStyles, createDimHeightStyles } from '../../utils/hoverStyles';

interface HoverDimsProps {
  hover: any;
  artboard: any;
}

const HoverDims = (props: HoverDimsProps) => (
  <div>
    <div
      className='c-selection__dim'
      style={createDimWidthStyles(props.hover.frame, props.artboard.frame)}>
      {props.hover.frame.width}px
    </div>
    <div
      className='c-selection__dim'
      style={createDimHeightStyles(props.hover.frame, props.artboard.frame)}>
      {props.hover.frame.height}px
    </div>
  </div>
);

export default HoverDims;
