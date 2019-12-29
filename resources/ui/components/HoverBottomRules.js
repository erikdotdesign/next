import React from 'react';
import { createRuleBottomStyles } from '../../utils/hoverStyles';
class HoverBottomRules extends React.Component {
    render() {
        const { hoverFrame, selectionFrame } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--bl', style: createRuleBottomStyles(hoverFrame, selectionFrame) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--br', style: createRuleBottomStyles(hoverFrame, selectionFrame) })));
    }
}
export default HoverBottomRules;
