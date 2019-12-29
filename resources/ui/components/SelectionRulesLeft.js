import React from 'react';
import { createRuleLeftStyles, createDimRightLeftStyles } from '../../utils/selectionStyles';
class SelectionRulesLeft extends React.Component {
    render() {
        const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
        return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--l', style: createRuleLeftStyles(selectionOrigin, hoverOrigin) },
            React.createElement("div", { className: 'c-selection__dim', style: createDimRightLeftStyles(selectionOrigin, artboardFrame) }, 
            // check if selection left origin is right hover right origin
            selectionOrigin.left > hoverOrigin.right
                // if so, display px from selection left to hover right
                ? `${selectionOrigin.left - hoverOrigin.right}px`
                // else, display px from selection left to hover left
                : `${selectionOrigin.left - hoverOrigin.left}px`)));
    }
}
export default SelectionRulesLeft;
