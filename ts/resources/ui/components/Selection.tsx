import React from 'react';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
import { createSelectionStyles } from '../styles/selectionStyles';

interface SelectionProps {
  selection: any;
  hover: any;
  artboard: any;
  zoom: number;
}

const Selection = (props: SelectionProps) => {
  const { selection, hover, artboard, zoom } = props;
  return (
    <div
      className='c-layer c-layer--selection'
      style={createSelectionStyles(selection.frame)}>
      <SelectionPoints zoom={zoom} />
      {
        hover
        ? <SelectionRules
            selectionFrame={selection.frame}
            hoverFrame={hover.frame}
            artboardFrame={artboard.frame}
            zoom={zoom} />
        : null
      }
    </div>
  )
};

export default Selection;
