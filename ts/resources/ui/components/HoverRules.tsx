import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../../utils/appUtils';

interface HoverRulesProps {
  hover: any;
  selection: any;
}

class HoverRules extends React.Component<HoverRulesProps, {}> {
  render() {
    const hoverFrame = this.props.hover.frame;
    const selectionFrame = this.props.selection.frame;
    const hoverOrigin = getOrigin(hoverFrame);
    const selectionOrigin = getOrigin(selectionFrame);
    return (
      <div className='c-hover__rules'>
        {
          selectionOrigin.yCenter < hoverOrigin.top
          ? <HoverRulesTop
              hoverOrigin={hoverOrigin}
              selectionOrigin={selectionOrigin} />
          : null
        }
        {
          selectionOrigin.xCenter > hoverOrigin.right
          ? <HoverRulesRight
              hoverOrigin={hoverOrigin}
              selectionOrigin={selectionOrigin} />
          : null
        }
        {
          selectionOrigin.yCenter > hoverOrigin.bottom
          ? <HoverRulesBottom
              hoverOrigin={hoverOrigin}
              selectionOrigin={selectionOrigin} />
          : null
        }
        {
          selectionOrigin.xCenter < hoverOrigin.left
          ? <HoverRulesLeft
              hoverOrigin={hoverOrigin}
              selectionOrigin={selectionOrigin} />
          : null
        }
      </div>
    );
  }
}

export default HoverRules;