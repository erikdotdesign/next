import React from 'react';
import Layers from './Layers';
import { createGroupStyles } from '../../utils/layerStyles';

interface GroupProps {
  layer: any;
}

class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <div className='c-layer c-layer--group' style={createGroupStyles(this.props.layer)}>
        <Layers layers={this.props.layer.layers} />
      </div>
    );
  }
}

export default Group;
