import React from 'react';
import { createGroupSelectedStyles } from '../../utils/selectionStyles';

interface GroupSelectionProps {
  layer: any;
  artboard: any;
}

class GroupSelection extends React.Component<GroupSelectionProps, {}> {
  render() {
    const { layer } = this.props;
    return (
      <div className='c-layer c-layer--selection' style={createGroupSelectedStyles(layer)}>

      </div>
    );
  }
}

export default GroupSelection;
