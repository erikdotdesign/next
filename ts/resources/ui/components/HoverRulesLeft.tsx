import React from 'react';
import { createRuleLeftStyles } from '../styles/hoverStyles';

interface HoverRulesLeftProps {
  hoverOrigin: any;
  selectionOrigin: any;
  zoom: number;
}

const HoverRulesLeft = (props: HoverRulesLeftProps) => {
  const { hoverOrigin, selectionOrigin, zoom } = props;
  return (
    <div>
      {
        selectionOrigin.bottom < hoverOrigin.top
        || selectionOrigin.top <= hoverOrigin.bottom && selectionOrigin.top > hoverOrigin.top
        || selectionOrigin.top < hoverOrigin.top && selectionOrigin.bottom > hoverOrigin.bottom
        ? <div
            className='c-hover__rule c-hover__rule--lt'
            style={createRuleLeftStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
      {
        selectionOrigin.top > hoverOrigin.bottom
        || selectionOrigin.bottom >= hoverOrigin.top && selectionOrigin.bottom < hoverOrigin.bottom
        || selectionOrigin.bottom > hoverOrigin.bottom && selectionOrigin.top < hoverOrigin.top
        ? <div
            className='c-hover__rule c-hover__rule--lb'
            style={createRuleLeftStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
    </div>
  );
}

export default HoverRulesLeft;