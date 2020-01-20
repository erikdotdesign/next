import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../utils';
const HoverRules = (props) => {
    const { hover, selection, zoom } = props;
    const hoverFrame = hover.frame;
    const selectionFrame = selection.frame;
    const hoverOrigin = getOrigin(hoverFrame);
    const selectionOrigin = getOrigin(selectionFrame);
    return (React.createElement("div", { className: 'c-hover__rules' },
        selectionOrigin.yCenter < hoverOrigin.top
            ? React.createElement(HoverRulesTop, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin, zoom: zoom })
            : null,
        selectionOrigin.xCenter > hoverOrigin.right
            ? React.createElement(HoverRulesRight, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin, zoom: zoom })
            : null,
        selectionOrigin.yCenter > hoverOrigin.bottom
            ? React.createElement(HoverRulesBottom, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin, zoom: zoom })
            : null,
        selectionOrigin.xCenter < hoverOrigin.left
            ? React.createElement(HoverRulesLeft, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin, zoom: zoom })
            : null));
};
export default HoverRules;
