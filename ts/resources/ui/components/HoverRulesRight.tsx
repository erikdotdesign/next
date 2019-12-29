import React from 'react';
import { createRuleRightStyles } from '../../utils/hoverStyles';

interface HoverRulesRightProps {
  hoverOrigin: any;
  selectionOrigin: any;
}

class HoverRulesRight extends React.Component<HoverRulesRightProps, {}> {
  render() {
    const { hoverOrigin, selectionOrigin } = this.props;
    return (
      <div>
        <div
          className='c-hover__rule c-hover__rule--rt'
          style={createRuleRightStyles(hoverOrigin, selectionOrigin)} />
        <div
          className='c-hover__rule c-hover__rule--rb'
          style={createRuleRightStyles(hoverOrigin, selectionOrigin)} />
      </div>
    );
  }
}

export default HoverRulesRight;