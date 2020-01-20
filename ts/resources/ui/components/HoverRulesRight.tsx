import React from 'react';
import { createRuleRightStyles } from '../styles/hoverStyles';

interface HoverRulesRightProps {
  hoverOrigin: srm.Origin;
  selectionOrigin: srm.Origin;
  zoom: number;
}

const HoverRulesRight = (props: HoverRulesRightProps) => {
  const { hoverOrigin, selectionOrigin, zoom } = props;
  return (
    <div>
      {
        selectionOrigin.bottom < hoverOrigin.top
        || selectionOrigin.top <= hoverOrigin.bottom && selectionOrigin.top > hoverOrigin.top
        || selectionOrigin.top < hoverOrigin.top && selectionOrigin.bottom > hoverOrigin.bottom
        ? <div
            className='c-hover__rule c-hover__rule--rt'
            style={createRuleRightStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
      {
        selectionOrigin.top > hoverOrigin.bottom
        || selectionOrigin.bottom >= hoverOrigin.top && selectionOrigin.bottom < hoverOrigin.bottom
        || selectionOrigin.bottom > hoverOrigin.bottom && selectionOrigin.top < hoverOrigin.top
        ? <div
            className='c-hover__rule c-hover__rule--rb'
            style={createRuleRightStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
    </div>
  );
}

export default HoverRulesRight;