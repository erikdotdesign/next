import React from 'react';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
import { createSelectionStyles } from '../styles/selectionStyles';

interface SelectionProps {
  selection: next.AppLayer;
  hover: next.AppLayer | null;
  artboard: next.Artboard;
  zoom: number;
}

const Selection = (props: SelectionProps) => {
  const { selection, hover, artboard, zoom } = props;
  return (
    <div
      className='c-layer c-layer--selection'
      style={createSelectionStyles(selection, artboard, zoom)}>
      <SelectionPoints zoom={zoom} />
      {
        hover
        ? <SelectionRules
            selection={selection}
            hover={hover}
            artboard={artboard}
            zoom={zoom} />
        : null
      }
    </div>
  )
};

export default Selection;
