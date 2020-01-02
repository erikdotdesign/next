import React from 'react';
import { createRuleTopStyles } from '../../utils/hoverStyles';

interface HoverRulesTopProps {
  hoverOrigin: any;
  selectionOrigin: any;
}

const HoverRulesTop = (props: HoverRulesTopProps) => {
  const { hoverOrigin, selectionOrigin } = props;
  return (
    <div>
      {
        selectionOrigin.right < hoverOrigin.left
        || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <div
            className='c-hover__rule c-hover__rule--tl'
            style={createRuleTopStyles(hoverOrigin, selectionOrigin)} />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.right
        || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <div
            className='c-hover__rule c-hover__rule--tr'
            style={createRuleTopStyles(hoverOrigin, selectionOrigin)} />
        : null
      }
    </div>
  );
}

export default HoverRulesTop;