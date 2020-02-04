import React from 'react';
import HoverRule from './HoverRule';
const HoverRulesBottom = (props) => {
    const { hoverOrigin, selectionOrigin } = props;
    return (React.createElement("div", null,
        selectionOrigin.right < hoverOrigin.left
            || selectionOrigin.left <= hoverOrigin.right && selectionOrigin.left > hoverOrigin.left
            || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
            ? React.createElement(HoverRule, Object.assign({}, props, { side: 'bottom', sideAlt: 'left' }))
            : null,
        selectionOrigin.left > hoverOrigin.right
            || selectionOrigin.right >= hoverOrigin.left && selectionOrigin.right < hoverOrigin.right
            || selectionOrigin.left < hoverOrigin.left && selectionOrigin.right > hoverOrigin.right
            ? React.createElement(HoverRule, Object.assign({}, props, { side: 'bottom', sideAlt: 'right' }))
            : null));
};
export default HoverRulesBottom;
