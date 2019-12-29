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
        {
          selectionOrigin.right < hoverOrigin.left
          || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
          || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
          ? <div
              className='c-hover__rule c-hover__rule--bl'
              style={createRuleBottomStyles(hoverOrigin, selectionOrigin)} />
          : null
        }
        {
          selectionOrigin.left > hoverOrigin.right
          || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
          || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
          ? <div
              className='c-hover__rule c-hover__rule--br'
              style={createRuleBottomStyles(hoverOrigin, selectionOrigin)} />
          : null
        }
      </div>
    );
  }
}

export default HoverRulesBottom;