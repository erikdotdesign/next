import React from 'react';
import HoverRule from './HoverRule';

interface HoverRulesTopProps {
  hoverOrigin: srm.Origin;
  selectionOrigin: srm.Origin;
  zoom: number;
}

const HoverRulesTop = (props: HoverRulesTopProps) => {
  const { hoverOrigin, selectionOrigin } = props;
  return (
    <div>
      {
        selectionOrigin.right < hoverOrigin.left
        || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <HoverRule
            {...props}
            side='top'
            sideAlt='left' />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.right
        || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <HoverRule
            {...props}
            side='top'
            sideAlt='right' />
        : null
      }
    </div>
  );
}

export default HoverRulesTop;