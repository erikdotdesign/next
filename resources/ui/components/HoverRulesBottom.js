import React from 'react';
import { createRuleBottomStyles } from '../../utils/hoverStyles';
class HoverRulesBottom extends React.Component {
    render() {
        const { hoverOrigin, selectionOrigin } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--bl', style: createRuleBottomStyles(hoverOrigin, selectionOrigin) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--br', style: createRuleBottomStyles(hoverOrigin, selectionOrigin) })));
    }
}
export default HoverRulesBottom;
