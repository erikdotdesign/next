import React from 'react';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';
import { createSelectionStyles } from '../../utils/selectionStyles';

interface SelectionProps {
  selection: any;
  hover: any;
  artboard: any;
}

const Selection = (props: SelectionProps) => (
  <div
    className='c-layer c-layer--selection'
    style={createSelectionStyles(props.selection.frame)}>
    <SelectionPoints />
    {
      props.hover
      ? <SelectionRules
          selectionFrame={props.selection.frame}
          hoverFrame={props.hover.frame}
          artboardFrame={props.artboard.frame} />
      : null
    }
  </div>
);

export default Selection;
