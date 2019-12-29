import React from 'react';
import { createRuleBottomStyles } from '../../utils/hoverStyles';

interface HoverRulesBottomProps {
  hoverOrigin: any;
  selectionOrigin: any;
}

class HoverRulesBottom extends React.Component<HoverRulesBottomProps, {}> {
  render() {
    const { hoverOrigin, selectionOrigin } = this.props;
    return (
      <div>
        <div
          className='c-hover__rule c-hover__rule--bl'
          style={createRuleBottomStyles(hoverOrigin, selectionOrigin)} />
        <div
          className='c-hover__rule c-hover__rule--br'
          style={createRuleBottomStyles(hoverOrigin, selectionOrigin)} />
      </div>
    );
  }
}

export default HoverRulesBottom;