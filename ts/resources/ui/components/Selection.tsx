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

const Selection = (props: SelectionProps) => (
  <div
    className='c-layer c-layer--selection'
    style={createSelectionStyles(props.selection.frame)}>
    <SelectionPoints zoom={props.zoom} />
    {
      props.hover
      ? <SelectionRules
          selectionFrame={props.selection.frame}
          hoverFrame={props.hover.frame}
          artboardFrame={props.artboard.frame}
          zoom={props.zoom} />
      : null
    }
  </div>
);

export default Selection;
