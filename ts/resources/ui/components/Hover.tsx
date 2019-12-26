import React from 'react';
import { createHoveredStyles, createDimWidthStyles, createDimHeightStyles } from '../../utils/selectionStyles';

interface HoverProps {
  layer: any;
  selection: any;
  artboard: any;
}

class Hover extends React.Component<HoverProps, {}> {
  render() {
    const { layer, artboard } = this.props;
    return (
      <div className='c-layer c-layer--hover' style={createHoveredStyles(layer)}>
        <div className='c-layer__dim c-layer__dim--width' style={createDimWidthStyles(layer, artboard)}>{layer.frame.width}px</div>
        <div className='c-layer__dim c-layer__dim--height' style={createDimHeightStyles(layer, artboard)}>{layer.frame.height}px</div>
        <div className='c-layer__rule c-layer__rule--t'></div>
        <div className='c-layer__rule c-layer__rule--r'></div>
        <div className='c-layer__rule c-layer__rule--b'></div>
        <div className='c-layer__rule c-layer__rule--l'></div>
      </div>
    );
  }
}

export default Hover;
