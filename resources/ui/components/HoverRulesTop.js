import React from 'react';
import { createRuleTopStyles } from '../styles/hoverStyles';
const HoverRulesTop = (props) => {
    const { hoverOrigin, selectionOrigin, zoom } = props;
    return (React.createElement("div", null,
        selectionOrigin.right < hoverOrigin.left
            || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
            || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
            ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--tl', style: createRuleTopStyles(hoverOrigin, selectionOrigin, zoom) })
            : null,
        selectionOrigin.left > hoverOrigin.right
            || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
            || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
            ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--tr', style: createRuleTopStyles(hoverOrigin, selectionOrigin, zoom) })
            : null));
};
export default HoverRulesTop;
