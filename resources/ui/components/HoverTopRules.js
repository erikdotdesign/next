import React from 'react';
import { createRuleTopStyles } from '../../utils/hoverStyles';
class HoverTopRules extends React.Component {
    render() {
        const { hoverFrame, selectionFrame } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--tl', style: createRuleTopStyles(hoverFrame, selectionFrame) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--tr', style: createRuleTopStyles(hoverFrame, selectionFrame) })));
    }
}
export default HoverTopRules;
