import React from 'react';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';

interface SelectionRulesBottomProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
  inset?: any;
}

const SelectionRulesBottom = (props: SelectionRulesBottomProps) => {
  const { selectionOrigin, hoverOrigin, artboardFrame, inset } = props;
  return (
    <div
      className='c-selection__rule c-selection__rule--b'
      style={createRuleBottomStyles(selectionOrigin, hoverOrigin, inset)}>
      <div
        className='c-selection__dim'
        style={createDimTopBottomStyles(selectionOrigin, artboardFrame)}>
        {
          selectionOrigin.bottom >= hoverOrigin.top
          ? `${hoverOrigin.bottom - selectionOrigin.bottom}px`
          : `${hoverOrigin.top - selectionOrigin.bottom}px`
        }
      </div>
    </div>
  );
}

export default SelectionRulesBottom;
