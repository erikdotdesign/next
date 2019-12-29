import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../../utils/appUtils';
class HoverRules extends React.Component {
    render() {
        const hoverFrame = this.props.hover.frame;
        const selectionFrame = this.props.selection.frame;
        const hoverOrigin = getOrigin(hoverFrame);
        const selectionOrigin = getOrigin(selectionFrame);
        return (React.createElement("div", { className: 'c-hover__rules' },
            React.createElement(HoverRulesTop, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin }),
            React.createElement(HoverRulesRight, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin }),
            React.createElement(HoverRulesBottom, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin }),
            React.createElement(HoverRulesLeft, { hoverOrigin: hoverOrigin, selectionOrigin: selectionOrigin })));
    }
}
export default HoverRules;
