import React from 'react';
import { createRuleLeftStyles } from '../../utils/hoverStyles';

interface HoverRulesLeftProps {
  hoverOrigin: any;
  selectionOrigin: any;
}

class HoverRulesLeft extends React.Component<HoverRulesLeftProps, {}> {
  render() {
    const { hoverOrigin, selectionOrigin } = this.props;
    return (
      <div>
        <div
          className='c-hover__rule c-hover__rule--lt'
          style={createRuleLeftStyles(hoverOrigin, selectionOrigin)} />
        <div
          className='c-hover__rule c-hover__rule--lb'
          style={createRuleLeftStyles(hoverOrigin, selectionOrigin)} />
      </div>
    );
  }
}

export default HoverRulesLeft;