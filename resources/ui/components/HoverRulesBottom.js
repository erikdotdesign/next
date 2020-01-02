import React from 'react';
import { createRuleBottomStyles } from '../../utils/hoverStyles';
const HoverRulesBottom = (props) => {
    const { hoverOrigin, selectionOrigin } = props;
    return (React.createElement("div", null,
        selectionOrigin.right < hoverOrigin.left
            || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
            || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
            ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--bl', style: createRuleBottomStyles(hoverOrigin, selectionOrigin) })
            : null,
        selectionOrigin.left > hoverOrigin.right
            || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
            || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
            ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--br', style: createRuleBottomStyles(hoverOrigin, selectionOrigin) })
            : null));
};
export default HoverRulesBottom;
