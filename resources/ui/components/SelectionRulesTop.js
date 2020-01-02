import React from 'react';
import { createRuleTopStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';
const SelectionRulesTop = (props) => {
    const { selectionOrigin, hoverOrigin, artboardFrame, inset } = props;
    return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--t', style: createRuleTopStyles(selectionOrigin, hoverOrigin, inset) },
        React.createElement("div", { className: 'c-selection__dim', style: createDimTopBottomStyles(selectionOrigin, artboardFrame) }, selectionOrigin.top <= hoverOrigin.bottom
            ? `${selectionOrigin.top - hoverOrigin.top}px`
            : `${selectionOrigin.top - hoverOrigin.bottom}px`)));
};
export default SelectionRulesTop;
