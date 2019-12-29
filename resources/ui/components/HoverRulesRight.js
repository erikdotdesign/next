import React from 'react';
import { createRuleRightStyles } from '../../utils/hoverStyles';
class HoverRulesRight extends React.Component {
    render() {
        const { hoverOrigin, selectionOrigin } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--rt', style: createRuleRightStyles(hoverOrigin, selectionOrigin) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--rb', style: createRuleRightStyles(hoverOrigin, selectionOrigin) })));
    }
}
export default HoverRulesRight;
