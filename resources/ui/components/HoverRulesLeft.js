import React from 'react';
import { createRuleLeftStyles } from '../styles/hoverStyles';
const HoverRulesLeft = (props) => {
    const { hoverOrigin, selectionOrigin } = props;
    return (React.createElement("div", null,
        selectionOrigin.bottom < hoverOrigin.top
            || selectionOrigin.top <= hoverOrigin.bottom && selectionOrigin.top > hoverOrigin.top
            || selectionOrigin.top < hoverOrigin.top && selectionOrigin.bottom > hoverOrigin.bottom
            ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--lt', style: createRuleLeftStyles(hoverOrigin, selectionOrigin) })
            : null,
        selectionOrigin.top > hoverOrigin.bottom
            || selectionOrigin.bottom >= hoverOrigin.top && selectionOrigin.bottom < hoverOrigin.bottom
            || selectionOrigin.bottom > hoverOrigin.bottom && selectionOrigin.top < hoverOrigin.top
            ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--lb', style: createRuleLeftStyles(hoverOrigin, selectionOrigin) })
            : null));
};
export default HoverRulesLeft;
