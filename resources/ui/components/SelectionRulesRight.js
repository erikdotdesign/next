import React from 'react';
import { createRuleRightStyles, createDimRightLeftStyles } from '../../utils/selectionStyles';
class SelectionRulesRight extends React.Component {
    render() {
        const { selectionOrigin, hoverOrigin, artboardFrame, inset } = this.props;
        return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--r', style: createRuleRightStyles(selectionOrigin, hoverOrigin, inset) },
            React.createElement("div", { className: 'c-selection__dim', style: createDimRightLeftStyles(selectionOrigin, artboardFrame) }, selectionOrigin.right >= hoverOrigin.left
                ? `${hoverOrigin.right - selectionOrigin.right}px`
                : `${hoverOrigin.left - selectionOrigin.right}px`)));
    }
}
export default SelectionRulesRight;
