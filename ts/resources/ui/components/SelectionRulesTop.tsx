import React from 'react';
import { createRuleTopStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';

interface SelectionRulesTopProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
}

class SelectionRulesTop extends React.Component<SelectionRulesTopProps, {}> {
  render() {
    const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
    return (
      <div
        className='c-selection__rule c-selection__rule--t'
        style={createRuleTopStyles(selectionOrigin, hoverOrigin)}>
        <div
          className='c-selection__dim'
          style={createDimTopBottomStyles(selectionOrigin, artboardFrame)}>
          {
            // check if selection top origin is below hover bottom origin
            selectionOrigin.top > hoverOrigin.bottom
            // if so, display px from selection top to hover bottom
            ? `${selectionOrigin.top - hoverOrigin.bottom}px`
            // else, display px from selection top to hover top
            : `${selectionOrigin.top - hoverOrigin.top}px`
          }
        </div>
      </div>
    );
  }
}

export default SelectionRulesTop;
