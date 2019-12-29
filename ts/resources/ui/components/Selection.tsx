import React from 'react';
import { createSelectionStyles } from '../../utils/selectionStyles';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';

interface SelectionProps {
  selection: any;
  hover: any;
  artboard: any;
}

class Selection extends React.Component<SelectionProps, {}> {
  render() {
    const { selection, hover, artboard } = this.props;
    return (
      <div
        className='c-layer c-layer--selection'
        style={createSelectionStyles(selection.frame)}>
        <SelectionPoints />
        {
          hover
          ? <SelectionRules
              selectionFrame={selection.frame}
              hoverFrame={hover.frame}
              artboardFrame={artboard.frame} />
          : null
        }
      </div>
    );
  }
}

export default Selection;
