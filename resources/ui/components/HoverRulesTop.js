import React from 'react';
import { createRuleTopStyles } from '../../utils/hoverStyles';
class HoverRulesTop extends React.Component {
    render() {
        const { hoverOrigin, selectionOrigin } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--tl', style: createRuleTopStyles(hoverOrigin, selectionOrigin) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--tr', style: createRuleTopStyles(hoverOrigin, selectionOrigin) })));
    }
}
export default HoverRulesTop;
