import React from 'react';
import { createRuleRightStyles } from '../../utils/hoverStyles';
class HoverRulesRight extends React.Component {
    render() {
        const { hoverOrigin, selectionOrigin } = this.props;
        return (React.createElement("div", null,
            selectionOrigin.bottom < hoverOrigin.top
                || selectionOrigin.top <= hoverOrigin.bottom && selectionOrigin.top > hoverOrigin.top
                || selectionOrigin.top < hoverOrigin.top && selectionOrigin.bottom > hoverOrigin.bottom
                ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--rt', style: createRuleRightStyles(hoverOrigin, selectionOrigin) })
                : null,
            selectionOrigin.top > hoverOrigin.bottom
                || selectionOrigin.bottom >= hoverOrigin.top && selectionOrigin.bottom < hoverOrigin.bottom
                || selectionOrigin.bottom > hoverOrigin.bottom && selectionOrigin.top < hoverOrigin.top
                ? React.createElement("div", { className: 'c-hover__rule c-hover__rule--rb', style: createRuleRightStyles(hoverOrigin, selectionOrigin) })
                : null));
    }
}
export default HoverRulesRight;
