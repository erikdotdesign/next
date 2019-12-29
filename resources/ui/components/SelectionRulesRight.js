import React from 'react';
import { createRuleRightStyles, createDimRightLeftStyles } from '../../utils/selectionStyles';
class SelectionRulesRight extends React.Component {
    render() {
        const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
        return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--r', style: createRuleRightStyles(selectionOrigin, hoverOrigin) },
            React.createElement("div", { className: 'c-selection__dim', style: createDimRightLeftStyles(selectionOrigin, artboardFrame) }, 
            // check if selection right origin is right hover left origin
            selectionOrigin.right > hoverOrigin.left
                // if so, display px from selection right to hover right
                ? `${hoverOrigin.right - selectionOrigin.right}px`
                // else, display px from selection right to hover left
                : `${hoverOrigin.left - selectionOrigin.right}px`)));
    }
}
export default SelectionRulesRight;
