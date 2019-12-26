import React from 'react';
import { createSelectedStyles } from '../../utils/selectionStyles';

interface SelectionProps {
  layer: any;
  artboard: any;
}

class Selection extends React.Component<SelectionProps, {}> {
  render() {
    const { layer } = this.props;
    return (
      <div className='c-layer c-layer--selection' style={createSelectedStyles(layer)}>
        <div className='c-selection-border c-selection-border--t' />
        <div className='c-selection-border c-selection-border--r' />
        <div className='c-selection-border c-selection-border--b' />
        <div className='c-selection-border c-selection-border--l' />
      </div>
    );
  }
}

export default Selection;
