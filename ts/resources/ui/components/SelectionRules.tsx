import React from 'react';
import SelectionRule from './SelectionRule';
import { getOrigin } from '../utils';

interface SelectionRulesProps {
  selection: next.AppLayer;
  hover: next.AppLayer;
  artboard: next.Artboard;
  zoom: number;
}

const SelectionRules = (props: SelectionRulesProps) => {
  const { selection, hover, artboard, zoom } = props;
  const selectionOrigin: next.Origin = getOrigin(selection, artboard);
  const hoverOrigin: next.Origin = getOrigin(hover, artboard);
  return (
    <div className='c-selection__rules'>
      {
        selectionOrigin.top > hoverOrigin.top
        ? <SelectionRule
            side='top'
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.right < hoverOrigin.right
        ? <SelectionRule
            side='right'
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.bottom < hoverOrigin.bottom
        ? <SelectionRule
            side='bottom'
            selectionOrigin={selectionOrigin}
            hoverOrigin={hoverOrigin}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.left > hoverOrigin.left
        ? <SelectionRule
            side='left'
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
