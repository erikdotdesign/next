import React from 'react';
import HoverRule from './HoverRule';

interface HoverRulesBottomProps {
  hoverOrigin: next.Origin;
  selectionOrigin: next.Origin;
  zoom: number;
}

const HoverRulesBottom = (props: HoverRulesBottomProps) => {
  const { hoverOrigin, selectionOrigin } = props;
  return (
    <div>
      {
        selectionOrigin.right < hoverOrigin.left
        || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <HoverRule
            {...props}
            side='bottom'
            sideAlt='left' />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.right
        || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <HoverRule
            {...props}
            side='bottom'
            sideAlt='right' />
        : null
      }
    </div>
  );
}

export default HoverRulesBottom;