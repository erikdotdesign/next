import React from 'react';
import { createRuleBottomStyles } from '../styles/hoverStyles';

interface HoverRulesBottomProps {
  hoverOrigin: srm.Origin;
  selectionOrigin: srm.Origin;
  zoom: number;
}

const HoverRulesBottom = (props: HoverRulesBottomProps) => {
  const { hoverOrigin, selectionOrigin, zoom } = props;
  return (
    <div>
      {
        selectionOrigin.right < hoverOrigin.left
        || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <div
            className='c-hover__rule c-hover__rule--bl'
            style={createRuleBottomStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.right
        || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
        || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
        ? <div
            className='c-hover__rule c-hover__rule--br'
            style={createRuleBottomStyles(hoverOrigin, selectionOrigin, zoom)} />
        : null
      }
    </div>
  );
}

export default HoverRulesBottom;