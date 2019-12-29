import React from 'react';
import { createRuleTopStyles } from '../../utils/hoverStyles';

interface HoverRulesTopProps {
  hoverOrigin: any;
  selectionOrigin: any;
}

class HoverRulesTop extends React.Component<HoverRulesTopProps, {}> {
  render() {
    const { hoverOrigin, selectionOrigin } = this.props;
    return (
      <div>
        <div
          className='c-hover__rule c-hover__rule--tl'
          style={createRuleTopStyles(hoverOrigin, selectionOrigin)} />
        <div
          className='c-hover__rule c-hover__rule--tr'
          style={createRuleTopStyles(hoverOrigin, selectionOrigin)} />
      </div>
    );
  }
}

export default HoverRulesTop;