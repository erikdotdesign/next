import React from 'react';
import { createRuleLeftStyles } from '../../utils/hoverStyles';
class HoverRulesLeft extends React.Component {
    render() {
        const { hoverOrigin, selectionOrigin } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--lt', style: createRuleLeftStyles(hoverOrigin, selectionOrigin) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--lb', style: createRuleLeftStyles(hoverOrigin, selectionOrigin) })));
    }
}
export default HoverRulesLeft;
