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
        <HoverRulesTop
          hoverOrigin={hoverOrigin}
          selectionOrigin={selectionOrigin}  />
        <HoverRulesRight
          hoverOrigin={hoverOrigin}
          selectionOrigin={selectionOrigin}  />
        <HoverRulesBottom
          hoverOrigin={hoverOrigin}
          selectionOrigin={selectionOrigin}  />
        <HoverRulesLeft
          hoverOrigin={hoverOrigin}
          selectionOrigin={selectionOrigin}  />
      </div>
    );
  }
}

export default HoverRules;