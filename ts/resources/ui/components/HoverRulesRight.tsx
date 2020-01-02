import React from 'react';
import { createRuleRightStyles } from '../../utils/hoverStyles';

interface HoverRulesRightProps {
  hoverOrigin: any;
  selectionOrigin: any;
}

const HoverRulesRight = (props: HoverRulesRightProps) => {
  const { hoverOrigin, selectionOrigin } = props;
  return (
    <div>
      {
        selectionOrigin.bottom < hoverOrigin.top
        || selectionOrigin.top <= hoverOrigin.bottom && selectionOrigin.top > hoverOrigin.top
        || selectionOrigin.top < hoverOrigin.top && selectionOrigin.bottom > hoverOrigin.bottom
        ? <div
            className='c-hover__rule c-hover__rule--rt'
            style={createRuleRightStyles(hoverOrigin, selectionOrigin)} />
        : null
      }
      {
        selectionOrigin.top > hoverOrigin.bottom
        || selectionOrigin.bottom >= hoverOrigin.top && selectionOrigin.bottom < hoverOrigin.bottom
        || selectionOrigin.bottom > hoverOrigin.bottom && selectionOrigin.top < hoverOrigin.top
        ? <div
            className='c-hover__rule c-hover__rule--rb'
            style={createRuleRightStyles(hoverOrigin, selectionOrigin)} />
        : null
      }
    </div>
  );
}

export default HoverRulesRight;