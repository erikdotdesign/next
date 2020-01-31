import React from 'react';
import HoverRule from './HoverRule';

interface HoverRulesRightProps {
  hoverOrigin: srm.Origin;
  selectionOrigin: srm.Origin;
  zoom: number;
}

const HoverRulesRight = (props: HoverRulesRightProps) => {
  const { hoverOrigin, selectionOrigin } = props;
  return (
    <div>
      {
        selectionOrigin.bottom < hoverOrigin.top
        || selectionOrigin.top <= hoverOrigin.bottom && selectionOrigin.top > hoverOrigin.top
        || selectionOrigin.top < hoverOrigin.top && selectionOrigin.bottom > hoverOrigin.bottom
        ? <HoverRule
            {...props}
            side='right'
            sideAlt='top' />
        : null
      }
      {
        selectionOrigin.top > hoverOrigin.bottom
        || selectionOrigin.bottom >= hoverOrigin.top && selectionOrigin.bottom < hoverOrigin.bottom
        || selectionOrigin.bottom > hoverOrigin.bottom && selectionOrigin.top < hoverOrigin.top
        ? <HoverRule
            {...props}
            side='right'
            sideAlt='bottom' />
        : null
      }
    </div>
  );
}

export default HoverRulesRight;