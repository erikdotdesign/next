import React from 'react';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';
class SelectionRulesBottom extends React.Component {
    render() {
        const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
        return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--b', style: createRuleBottomStyles(selectionOrigin, hoverOrigin) },
            React.createElement("div", { className: 'c-selection__dim', style: createDimTopBottomStyles(selectionOrigin, artboardFrame) }, 
            // check if selection bottom origin is below hover top origin
            selectionOrigin.bottom > hoverOrigin.top
                // if so, display px from selection bottom to hover bottom
                ? `${hoverOrigin.bottom - selectionOrigin.bottom}px`
                // else, display px from selection bottom to hover top
                : `${hoverOrigin.top - selectionOrigin.bottom}px`)));
    }
}
export default SelectionRulesBottom;
