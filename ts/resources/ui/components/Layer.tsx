import React from 'react';
import Image from './Image';
import ShapePath from './ShapePath';
import Text from './Text';
import Shape from './Shape';
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
    this.props.setAppState({
      selection: this.props.layer
    });
  }
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
      case 'Image':
        return (
          <Image
            {...this.props}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut} />
        )
      case 'ShapePath':
        return  (
          <ShapePath
            {...this.props}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut} />
        )
      case 'Text':
        return (
          <Text
            {...this.props}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut} />
        )
      // case 'Shape':
      //   return (
      //     <Shape
      //       {...this.props}
      //       onClick={this.onClick}
      //       onMouseOver={this.onMouseOver}
      //       onMouseOut={this.onMouseOut} />
      //   )
      // case 'Slice':
      //   return (
      //     <Slice
      //       {...this.props}
      //       onClick={this.onClick}
      //       onMouseOver={this.onMouseOver}
      //       onMouseOut={this.onMouseOut} />
      //   )
      default:
        return <div className='c-layer' />
    }
  }
}

export default Layer;
