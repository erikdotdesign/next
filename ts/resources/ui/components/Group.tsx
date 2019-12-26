import React from 'react';
import Layers from './Layers';
import { createGroupStyles } from '../../utils/layerStyles';

interface GroupProps {
  layer: any;
  images: any;
  setAppState: any;
  appState: any;
  onClick(): void;
  //onDoubleClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        //onDoubleClick={this.props.onDoubleClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        data-layer-name={this.props.layer.name}
        className='c-layer c-layer--group'
        // @ts-ignore
        style={createGroupStyles(this.props.layer)}>
        <Layers layers={this.props.layer.layers} {...this.props} />
      </div>
    );
  }
}

export default Group;
