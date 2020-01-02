import React from 'react';
import SelectionRulesTop from './SelectionRulesTop';
import SelectionRulesRight from './SelectionRulesRight';
import SelectionRulesBottom from './SelectionRulesBottom';
import SelectionRulesLeft from './SelectionRulesLeft';
import { getOrigin } from '../../utils/appUtils';
const SelectionRules = (props) => {
    const { selectionFrame, hoverFrame, artboardFrame } = props;
    const selectionOrigin = getOrigin(selectionFrame);
    const hoverOrigin = getOrigin(hoverFrame);
    return (React.createElement("div", { className: 'c-selection__rules' },
        selectionOrigin.top > hoverOrigin.top
            ? React.createElement(SelectionRulesTop, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboardFrame })
            : null,
        selectionOrigin.right < hoverOrigin.right
            ? React.createElement(SelectionRulesRight, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboardFrame })
            : null,
        selectionOrigin.bottom < hoverOrigin.bottom
            ? React.createElement(SelectionRulesBottom, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboardFrame })
            : null,
        selectionOrigin.left > hoverOrigin.left
            ? React.createElement(SelectionRulesLeft, { selectionOrigin: selectionOrigin, hoverOrigin: hoverOrigin, artboardFrame: artboardFrame })
            : null));
};
export default SelectionRules;
