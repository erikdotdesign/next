import React from 'react';
import { createRuleRightStyles } from '../../utils/hoverStyles';
class HoverRightRules extends React.Component {
    render() {
        const { hoverFrame, selectionFrame } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--rt', style: createRuleRightStyles(hoverFrame, selectionFrame) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--rb', style: createRuleRightStyles(hoverFrame, selectionFrame) })));
    }
}
export default HoverRightRules;
