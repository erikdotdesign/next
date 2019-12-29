import React from 'react';
import { createRuleBottomStyles, createDimTopBottomStyles } from '../../utils/selectionStyles';
class SelectionRulesBottom extends React.Component {
    render() {
        const { selectionOrigin, hoverOrigin, artboardFrame, inset } = this.props;
        return (React.createElement("div", { className: 'c-selection__rule c-selection__rule--b', style: createRuleBottomStyles(selectionOrigin, hoverOrigin, inset) },
            React.createElement("div", { className: 'c-selection__dim', style: createDimTopBottomStyles(selectionOrigin, artboardFrame) }, selectionOrigin.bottom >= hoverOrigin.top
                ? `${hoverOrigin.bottom - selectionOrigin.bottom}px`
                : `${hoverOrigin.top - selectionOrigin.bottom}px`)));
    }
}
export default SelectionRulesBottom;
