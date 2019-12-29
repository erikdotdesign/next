import React from 'react';
import { createDimWidthStyles, createDimHeightStyles } from '../../utils/hoverStyles';

interface HoverDimsProps {
  hover: any;
  artboard: any;
}

class HoverDims extends React.Component<HoverDimsProps, {}> {
  render() {
    const { hover, artboard } = this.props;
    return (
      <div>
        <div
          className='c-selection__dim'
          style={createDimWidthStyles(hover.frame, artboard.frame)}>
          {hover.frame.width}px
        </div>
        <div
          className='c-selection__dim'
          style={createDimHeightStyles(hover.frame, artboard.frame)}>
          {hover.frame.height}px
        </div>
      </div>
    );
  }
}

export default HoverDims;
