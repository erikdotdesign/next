import React from 'react';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
import { createSelectionStyles } from '../../utils/selectionStyles';
const Selection = (props) => (React.createElement("div", { className: 'c-layer c-layer--selection', style: createSelectionStyles(props.selection.frame) },
    React.createElement(SelectionPoints, null),
    props.hover
        ? React.createElement(SelectionRules, { selectionFrame: props.selection.frame, hoverFrame: props.hover.frame, artboardFrame: props.artboard.frame, zoom: props.zoom })
        : null));
export default Selection;
