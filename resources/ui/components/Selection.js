import React from 'react';
import { createSelectedStyles } from '../../utils/selectionStyles';
class Selection extends React.Component {
    render() {
        const { layer } = this.props;
        return (React.createElement("div", { className: 'c-layer c-layer--selection', style: createSelectedStyles(layer) },
            React.createElement("div", { className: 'c-selection-border c-selection-border--t' }),
            React.createElement("div", { className: 'c-selection-border c-selection-border--r' }),
            React.createElement("div", { className: 'c-selection-border c-selection-border--b' }),
            React.createElement("div", { className: 'c-selection-border c-selection-border--l' })));
    }
}
export default Selection;
