import React from 'react';
import HoverRule from './HoverRule';
const HoverRulesLeft = (props) => {
    const { hoverOrigin, selectionOrigin } = props;
    return (React.createElement("div", null,
        selectionOrigin.bottom < hoverOrigin.top
            || selectionOrigin.top <= hoverOrigin.bottom && selectionOrigin.top > hoverOrigin.top
            || selectionOrigin.top < hoverOrigin.top && selectionOrigin.bottom > hoverOrigin.bottom
            ? React.createElement(HoverRule, Object.assign({}, props, { side: 'left', sideAlt: 'top' }))
            : null,
        selectionOrigin.top > hoverOrigin.bottom
            || selectionOrigin.bottom >= hoverOrigin.top && selectionOrigin.bottom < hoverOrigin.bottom
            || selectionOrigin.bottom > hoverOrigin.bottom && selectionOrigin.top < hoverOrigin.top
            ? React.createElement(HoverRule, Object.assign({}, props, { side: 'left', sideAlt: 'bottom' }))
            : null));
};
export default HoverRulesLeft;
