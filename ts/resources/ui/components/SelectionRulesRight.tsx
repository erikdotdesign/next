import React from 'react';
import { createRuleRightStyles, createDimRightLeftStyles } from '../styles/selectionStyles';

interface SelectionRulesRightProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
  zoom: number;
  inset?: any
}

const SelectionRulesRight = (props: SelectionRulesRightProps) => {
  const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
  return (
    <div
      className='c-selection__rule c-selection__rule--r'
      style={createRuleRightStyles(selectionOrigin, hoverOrigin, inset, zoom)}>
      <div
        className='c-selection__dim'
        style={createDimRightLeftStyles(selectionOrigin, artboardFrame, zoom)}>
        {
          selectionOrigin.right >= hoverOrigin.left
          ? hoverOrigin.right - selectionOrigin.right
          : hoverOrigin.left - selectionOrigin.right
        }
      </div>
    </div>
  );
}

export default SelectionRulesRight;
