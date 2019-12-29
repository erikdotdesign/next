import React from 'react';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';
import { getOrigin } from '../../utils/appUtils';
class SelectionBottomRule extends React.Component {
    render() {
        const { selectionFrame, hoverFrame, artboardFrame } = this.props;
        const selection = getOrigin(selectionFrame);
        const hover = getOrigin(hoverFrame);
        return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--b', style: createRuleBottomStyles(selectionFrame, hoverFrame) },
            React.createElement("div", { className: 'c-selection__dim', style: createDimTopBottomStyles(selectionFrame, artboardFrame) }, 
            // check if selection bottom origin is below hover top origin
            selection.bottom > hover.top
                // if so, display px from selection bottom to hover bottom
                ? `${hover.bottom - selection.bottom}px`
                // else, display px from selection bottom to hover top
                : `${hover.top - selection.bottom}px`)));
    }
}
export default SelectionBottomRule;
