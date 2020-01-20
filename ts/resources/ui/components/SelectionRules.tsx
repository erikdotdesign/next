import React from 'react';
import SelectionRulesTop from './SelectionRulesTop';
import SelectionRulesRight from './SelectionRulesRight';
import SelectionRulesBottom from './SelectionRulesBottom';
import SelectionRulesLeft from './SelectionRulesLeft';
import { getOrigin } from '../utils';

interface SelectionRulesProps {
  selectionFrame: srm.Rectangle;
  hoverFrame: srm.Rectangle;
  artboardFrame: srm.Rectangle;
  zoom: number;
}

const SelectionRules = (props: SelectionRulesProps) => {
  const { selectionFrame, hoverFrame, artboardFrame, zoom } = props;
  const selectionOrigin: srm.Origin = getOrigin(selectionFrame);
  const hoverOrigin: srm.Origin = getOrigin(hoverFrame);
  return (
    <div className='c-selection__rules'>
      {
        selectionOrigin.top > hoverOrigin.top
        ? <SelectionRulesTop
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboardFrame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.right < hoverOrigin.right
        ? <SelectionRulesRight
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboardFrame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.bottom < hoverOrigin.bottom
        ? <SelectionRulesBottom
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboardFrame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.left
        ? <SelectionRulesLeft
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboardFrame}
            zoom={zoom} />
        : null
      }
    </div>
  );
}

export default SelectionRules;
