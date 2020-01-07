import React from 'react';
import { createRuleRightStyles, createDimRightLeftStyles } from '../../utils/selectionStyles';
const SelectionRulesRight = (props) => {
    const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
    return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--r', style: createRuleRightStyles(selectionOrigin, hoverOrigin, inset) },
        React.createElement("div", { className: 'c-selection__dim', style: createDimRightLeftStyles(selectionOrigin, artboardFrame, zoom) }, selectionOrigin.right >= hoverOrigin.left
            ? `${hoverOrigin.right - selectionOrigin.right}px`
            : `${hoverOrigin.left - selectionOrigin.right}px`)));
};
export default SelectionRulesRight;
