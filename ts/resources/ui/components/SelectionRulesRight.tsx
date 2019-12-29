import React from 'react';
import { createRuleRightStyles, createDimRightLeftStyles } from '../../utils/selectionStyles';

interface SelectionRulesRightProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
}

class SelectionRulesRight extends React.Component<SelectionRulesRightProps, {}> {
  render() {
    const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
    return (
      <div
        className='c-selection__rule c-selection__rule--r'
        style={createRuleRightStyles(selectionOrigin, hoverOrigin)}>
        <div
          className='c-selection__dim'
          style={createDimRightLeftStyles(selectionOrigin, artboardFrame)}>
          {
            // check if selection right origin is right hover left origin
            selectionOrigin.right > hoverOrigin.left
            // if so, display px from selection right to hover right
            ? `${hoverOrigin.right - selectionOrigin.right}px`
            // else, display px from selection right to hover left
            : `${hoverOrigin.left - selectionOrigin.right}px`
          }
        </div>
      </div>
    );
  }
}

export default SelectionRulesRight;
