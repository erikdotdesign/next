import React from 'react';
import { createRuleTopStyles } from '../styles/hoverStyles';

interface HoverRulesTopProps {
  hoverOrigin: srm.Origin;
  selectionOrigin: srm.Origin;
  zoom: number;
}

const HoverRulesTop = (props: HoverRulesTopProps) => {
  const { hoverOrigin, selectionOrigin, zoom } = props;
  return (
    <div>
      {
        selectionOrigin.right < hoverOrigin.left
        || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <div
            className='c-hover__rule c-hover__rule--tl'
            style={createRuleTopStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.right
        || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <div
            className='c-hover__rule c-hover__rule--tr'
            style={createRuleTopStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
    </div>
  );
}

export default HoverRulesTop;