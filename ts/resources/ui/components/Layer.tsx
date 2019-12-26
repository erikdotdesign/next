import React from 'react';
import Group from './Group';
import Image from './Image';
import Shape from './Shape';
import ShapePath from './ShapePath';
import Text from './Text';
import Slice from './Slice';

interface LayerProps {
  layer: any;
  images: any;
  setAppState: any;
  appState: any;
}

interface LayerState {
  selected: boolean;
  hovered: boolean;
}

class Layer extends React.Component<LayerProps, LayerState> {
  onClick = () => {
    if (this.props.layer.type === 'Group') {
      this.props.setAppState({
        selection: this.props.layer,
        group: this.props.layer
      });
    } else {
      this.props.setAppState({
        selection: this.props.layer
      });
    }
  }
  // onDoubleClick = () => {
  //   this.props.setAppState({
  //     group: this.props.layer
  //   });
  // }
  onMouseOver = () => {
    this.props.setAppState({
      hover: this.props.layer
    });
  }
  onMouseOut = () => {
    this.props.setAppState({
      hover: ''
    });
  }
  render() {
    switch(this.props.layer.type) {
      case 'Group':
        return <Group
                  onClick={this.onClick}
                  //onDoubleClick={this.onDoubleClick}
                  onMouseOver={this.onMouseOver}
                  onMouseOut={this.onMouseOut}
                  {...this.props} />
      case 'Image':
        return <Image
                  {...this.props} />
      case 'ShapePath':
        return  <ShapePath
                  {...this.props}
                  onClick={this.onClick}
                  onMouseOver={this.onMouseOver}
                  onMouseOut={this.onMouseOut} />
      case 'Text':
        return <Text
                  {...this.props} />
      case 'Shape':
        return <Shape {...this.props} />
      case 'Slice':
        return <Slice {...this.props} />
      default:
        return <div className='c-layer' />
    }
  }
}

export default Layer;
