import React from 'react';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';

interface SelectionRulesBottomProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
}

class SelectionRulesBottom extends React.Component<SelectionRulesBottomProps, {}> {
  render() {
    const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
    return (
      <div
        className='c-selection__rule c-selection__rule--b'
        style={createRuleBottomStyles(selectionOrigin, hoverOrigin)}>
        <div
          className='c-selection__dim'
          style={createDimTopBottomStyles(selectionOrigin, artboardFrame)}>
          {
            // check if selection bottom origin is below hover top origin
            selectionOrigin.bottom > hoverOrigin.top
            // if so, display px from selection bottom to hover bottom
            ? `${hoverOrigin.bottom - selectionOrigin.bottom}px`
            // else, display px from selection bottom to hover top
            : `${hoverOrigin.top - selectionOrigin.bottom}px`
          }
        </div>
      </div>
    );
  }
}

export default SelectionRulesBottom;
