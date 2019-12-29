import React from 'react';
import { createSelectionStyles } from '../../utils/selectionStyles';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
class Selection extends React.Component {
    render() {
        const { selection, hover, artboard } = this.props;
        return (React.createElement("div", { className: 'c-layer c-layer--selection', style: createSelectionStyles(selection.frame) },
            React.createElement(SelectionPoints, null),
            hover
                ? React.createElement(SelectionRules, { selectionFrame: selection.frame, hoverFrame: hover.frame, artboardFrame: artboard.frame })
                : null));
    }
}
export default Selection;
