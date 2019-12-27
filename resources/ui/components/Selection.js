import React from 'react';
import { createSelectionStyles } from '../../utils/selectionStyles';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
class Selection extends React.Component {
    render() {
        const { layer, hover } = this.props;
        return (React.createElement("div", { className: 'c-layer c-layer--selection', style: createSelectionStyles(layer) },
            React.createElement(SelectionPoints, null),
            hover
                ? React.createElement(SelectionRules, Object.assign({}, this.props))
                : null));
    }
}
export default Selection;
