import React from 'react';
import { createRuleTopStyles, createDimTopBottomStyles } from '../styles/selectionStyles';

interface SelectionRulesTopProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
  zoom: number;
  inset?: any;
}

const SelectionRulesTop = (props: SelectionRulesTopProps) => {
  const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
  return (
    <div
      className='c-selection__rule c-selection__rule--t'
      style={createRuleTopStyles(selectionOrigin, hoverOrigin, inset, zoom)}>
      <div
        className='c-selection__dim'
        style={createDimTopBottomStyles(selectionOrigin, artboardFrame, zoom)}>
        {
          selectionOrigin.top <= hoverOrigin.bottom
          ? selectionOrigin.top - hoverOrigin.top
          : selectionOrigin.top - hoverOrigin.bottom
        }
      </div>
    </div>
  );
}

export default SelectionRulesTop;
