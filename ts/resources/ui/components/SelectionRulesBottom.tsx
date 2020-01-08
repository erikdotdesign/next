import React from 'react';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../styles/selectionStyles';

interface SelectionRulesBottomProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
  zoom: number;
  inset?: any;
}

const SelectionRulesBottom = (props: SelectionRulesBottomProps) => {
  const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
  return (
    <div
      className='c-selection__rule c-selection__rule--b'
      style={createRuleBottomStyles(selectionOrigin, hoverOrigin, inset)}>
      <div
        className='c-selection__dim'
        style={createDimTopBottomStyles(selectionOrigin, artboardFrame, zoom)}>
        {
          selectionOrigin.bottom >= hoverOrigin.top
          ? hoverOrigin.bottom - selectionOrigin.bottom
          : hoverOrigin.top - selectionOrigin.bottom
        }
      </div>
    </div>
  );
}

export default SelectionRulesBottom;
