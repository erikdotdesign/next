import React from 'react';
import { createHoveredStyles, createDimWidthStyles, createDimHeightStyles } from '../../utils/hoverStyles';

interface HoverProps {
  layer: any;
  selection: any;
  artboard: any;
}

class Hover extends React.Component<HoverProps, {}> {
  render() {
    const { layer, selection, artboard } = this.props;
    return (
      <div className='c-layer c-layer--hover' style={createHoveredStyles(layer)}>
        {
          !selection
          ? <div>
              <div
                className='c-selection__dim'
                style={createDimWidthStyles(layer, artboard)}>
                {layer.frame.width}px
              </div>
              <div
                className='c-selection__dim'
                style={createDimHeightStyles(layer, artboard)}>
                {layer.frame.height}px
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default Hover;
