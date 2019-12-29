import React from 'react';
import { createRuleTopStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';
class SelectionRulesTop extends React.Component {
    render() {
        const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
        return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--t', style: createRuleTopStyles(selectionOrigin, hoverOrigin) },
            React.createElement("div", { className: 'c-selection__dim', style: createDimTopBottomStyles(selectionOrigin, artboardFrame) }, selectionOrigin.top <= hoverOrigin.bottom
                ? `${selectionOrigin.top - hoverOrigin.top}px`
                : `${selectionOrigin.top - hoverOrigin.bottom}px`)));
    }
}
export default SelectionRulesTop;
