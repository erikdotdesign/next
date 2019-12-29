import React from 'react';
import HoverDims from './HoverDims';
import HoverRules from './HoverRules';
import { createHoveredStyles } from '../../utils/hoverStyles';

interface HoverProps {
  hover: any;
  selection: any;
  artboard: any;
}

class Hover extends React.Component<HoverProps, {}> {
  render() {
    const { hover, selection, artboard } = this.props;
    return (
      <div
        className='c-layer c-layer--hover'
        style={createHoveredStyles(hover.frame)}>
        {
          selection
          ? <HoverRules hover={hover} selection={selection} />
          : <HoverDims hover={hover} artboard={artboard} />
        }
      </div>
    );
  }
}

export default Hover;
