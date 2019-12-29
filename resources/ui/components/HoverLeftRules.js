import React from 'react';
import { createRuleLeftStyles } from '../../utils/hoverStyles';
class HoverLeftRules extends React.Component {
    render() {
        const { hoverFrame, selectionFrame } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--lt', style: createRuleLeftStyles(hoverFrame, selectionFrame) }),
            React.createElement("div", { className: 'c-hover__rule c-hover__rule--lb', style: createRuleLeftStyles(hoverFrame, selectionFrame) })));
    }
}
export default HoverLeftRules;
