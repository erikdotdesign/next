import React from 'react';
import { createSelectionStyles } from '../../utils/selectionStyles';
import SelectionPoints from './SelectionPoints';
import SelectionRules from './SelectionRules';

interface SelectionProps {
  layer: any;
  hover: any;
  artboard: any;
}

class Selection extends React.Component<SelectionProps, {}> {
  render() {
    const { layer, hover } = this.props;
    return (
      <div className='c-layer c-layer--selection' style={createSelectionStyles(layer)}>
        <SelectionPoints />
        {
          hover
          ? <SelectionRules {...this.props} />
          : null
        }
      </div>
    );
  }
}

export default Selection;
