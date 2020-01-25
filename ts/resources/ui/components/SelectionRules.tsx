import React from 'react';
import SelectionRulesTop from './SelectionRulesTop';
import SelectionRulesRight from './SelectionRulesRight';
import SelectionRulesBottom from './SelectionRulesBottom';
import SelectionRulesLeft from './SelectionRulesLeft';
import { getOrigin } from '../utils';

interface SelectionRulesProps {
  selection: srm.AppLayer;
  hover: srm.AppLayer;
  artboard: srm.Artboard;
  zoom: number;
}

const SelectionRules = (props: SelectionRulesProps) => {
  const { selection, hover, artboard, zoom } = props;
  const selectionOrigin: srm.Origin = getOrigin(selection, artboard);
  const hoverOrigin: srm.Origin = getOrigin(hover, artboard);
  return (
    <div className='c-selection__rules'>
      {
        selectionOrigin.top > hoverOrigin.top
        ? <SelectionRulesTop
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.right < hoverOrigin.right
        ? <SelectionRulesRight
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.bottom < hoverOrigin.bottom
        ? <SelectionRulesBottom
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.left
        ? <SelectionRulesLeft
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
    </div>
  );
}

export default SelectionRules;
