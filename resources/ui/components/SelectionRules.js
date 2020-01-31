import React from 'react';
import SelectionRule from './SelectionRule';
import { getOrigin } from '../utils';
const SelectionRules = (props) => {
    const { selection, hover, artboard, zoom } = props;
    const selectionOrigin = getOrigin(selection, artboard);
    const hoverOrigin = getOrigin(hover, artboard);
    return (React.createElement("div", { className: 'c-selection__rules' },
        selectionOrigin.top > hoverOrigin.top
            ? React.createElement(SelectionRule, { side: 'top', selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null,
        selectionOrigin.right < hoverOrigin.right
            ? React.createElement(SelectionRule, { side: 'right', selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null,
        selectionOrigin.bottom < hoverOrigin.bottom
            ? React.createElement(SelectionRule, { side: 'bottom', selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null,
        selectionOrigin.left > hoverOrigin.left
            ? React.createElement(SelectionRule, { side: 'left', selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null));
};
export default SelectionRules;
