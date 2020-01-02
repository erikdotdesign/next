import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../../utils/appUtils';
const HoverRules = (props) => {
    const hoverFrame = props.hover.frame;
    const selectionFrame = props.selection.frame;
    const hoverOrigin = getOrigin(hoverFrame);
    const selectionOrigin = getOrigin(selectionFrame);
    return (React.createElement("div", { className: 'c-hover__rules' },
        selectionOrigin.yCenter < hoverOrigin.top
            ? React.createElement(HoverRulesTop, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin })
            : null,
        selectionOrigin.xCenter > hoverOrigin.right
            ? React.createElement(HoverRulesRight, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin })
            : null,
        selectionOrigin.yCenter > hoverOrigin.bottom
            ? React.createElement(HoverRulesBottom, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin })
            : null,
        selectionOrigin.xCenter < hoverOrigin.left
            ? React.createElement(HoverRulesLeft, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin })
            : null));
};
export default HoverRules;
