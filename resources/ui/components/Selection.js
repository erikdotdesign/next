import React from 'react';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
import { createSelectionStyles } from '../styles/selectionStyles';
const Selection = (props) => {
    const { selection, hover, artboard, zoom } = props;
    return (React.createElement("div", { className: 'c-layer c-layer--selection', style: createSelectionStyles(selection, artboard, zoom) },
        React.createElement(SelectionPoints, { zoom: zoom }),
        hover
            ? React.createElement(SelectionRules, { selection: selection, hover: hover, artboard: artboard, zoom: zoom })
            : null));
};
export default Selection;
