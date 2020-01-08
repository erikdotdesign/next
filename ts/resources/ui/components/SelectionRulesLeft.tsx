import React from 'react';
import { createRuleLeftStyles, createDimRightLeftStyles } from '../styles/selectionStyles';

interface SelectionRulesLeftProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
  zoom: number;
  inset?: any
}

const SelectionRulesLeft = (props: SelectionRulesLeftProps) => {
  const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
  return (
    <div
      className='c-selection__rule c-selection__rule--l'
      style={createRuleLeftStyles(selectionOrigin, hoverOrigin, inset)}>
      <div
        className='c-selection__dim'
        style={createDimRightLeftStyles(selectionOrigin, artboardFrame, zoom)}>
        {
          selectionOrigin.left <= hoverOrigin.right
          ? selectionOrigin.left - hoverOrigin.left
          : selectionOrigin.left - hoverOrigin.right
        }
      </div>
    </div>
  );
}

export default SelectionRulesLeft;
