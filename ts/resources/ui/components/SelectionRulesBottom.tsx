import React from 'react';
import LayerDim from './LayerDim';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../styles/selectionStyles';

interface SelectionRulesBottomProps {
  selectionOrigin: srm.Origin;
  hoverOrigin: srm.Origin;
  artboardFrame: srm.Rectangle;
  zoom: number;
  inset?: any;
}

const SelectionRulesBottom = (props: SelectionRulesBottomProps) => {
  const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
  return (
    <div
      className='c-selection__rule c-selection__rule--b'
      style={createRuleBottomStyles(selectionOrigin, hoverOrigin, inset, zoom)}>
      <LayerDim
        style={createDimTopBottomStyles(selectionOrigin, artboardFrame, zoom)}
        dim={
          selectionOrigin.bottom >= hoverOrigin.top
          ? hoverOrigin.bottom - selectionOrigin.bottom
          : hoverOrigin.top - selectionOrigin.bottom
        } />
    </div>
  );
}

export default SelectionRulesBottom;
