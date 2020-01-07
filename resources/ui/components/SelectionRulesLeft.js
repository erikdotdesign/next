import React from 'react';
import { createRuleLeftStyles, createDimRightLeftStyles } from '../../utils/selectionStyles';
const SelectionRulesLeft = (props) => {
    const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
    return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--l', style: createRuleLeftStyles(selectionOrigin, hoverOrigin, inset) },
        React.createElement("div", { className: 'c-selection__dim', style: createDimRightLeftStyles(selectionOrigin, artboardFrame, zoom) }, selectionOrigin.left <= hoverOrigin.right
            ? `${selectionOrigin.left - hoverOrigin.left}px`
            : `${selectionOrigin.left - hoverOrigin.right}px`)));
};
export default SelectionRulesLeft;
