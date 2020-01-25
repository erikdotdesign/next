import React from 'react';
import SelectionRulesTop from './SelectionRulesTop';
import SelectionRulesRight from './SelectionRulesRight';
import SelectionRulesBottom from './SelectionRulesBottom';
import SelectionRulesLeft from './SelectionRulesLeft';
import { getOrigin } from '../utils';
const SelectionRules = (props) => {
    const { selection, hover, artboard, zoom } = props;
    const selectionOrigin = getOrigin(selection, artboard);
    const hoverOrigin = getOrigin(hover, artboard);
    return (React.createElement("div", { className: 'c-selection__rules' },
        selectionOrigin.top > hoverOrigin.top
            ? React.createElement(SelectionRulesTop, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null,
        selectionOrigin.right < hoverOrigin.right
            ? React.createElement(SelectionRulesRight, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null,
        selectionOrigin.bottom < hoverOrigin.bottom
            ? React.createElement(SelectionRulesBottom, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null,
        selectionOrigin.left > hoverOrigin.left
            ? React.createElement(SelectionRulesLeft, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboard.frame, zoom: zoom })
            : null));
};
export default SelectionRules;
