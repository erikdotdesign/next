import React from 'react';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
import { createSelectionStyles } from '../styles/selectionStyles';
const Selection = (props) => {
    const { selection, hover, artboard, zoom } = props;
    return (React.createElement("div", { className: 'c-layer c-layer--selection', style: createSelectionStyles(selection.frame) },
        React.createElement(SelectionPoints, { zoom: zoom }),
        hover
            ? React.createElement(SelectionRules, { selectionFrame: selection.frame, hoverFrame: hover.frame, artboardFrame: artboard.frame, zoom: zoom })
            : null));
};
export default Selection;
