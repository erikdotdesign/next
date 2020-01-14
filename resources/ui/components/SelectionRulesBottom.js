import React from 'react';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../styles/selectionStyles';
const SelectionRulesBottom = (props) => {
    const { selectionOrigin, hoverOrigin, artboardFrame, inset, zoom } = props;
    return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--b', style: createRuleBottomStyles(selectionOrigin, hoverOrigin, inset, zoom) },
        React.createElement("div", { className: 'c-selection__dim', style: createDimTopBottomStyles(selectionOrigin, artboardFrame, zoom) }, selectionOrigin.bottom >= hoverOrigin.top
            ? hoverOrigin.bottom - selectionOrigin.bottom
            : hoverOrigin.top - selectionOrigin.bottom)));
};
export default SelectionRulesBottom;
