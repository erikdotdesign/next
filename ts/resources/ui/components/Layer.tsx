import React from 'react';
import Image from './Image';
import ShapePath from './ShapePath';
import Shape from './Shape';
import Text from './Text';

interface LayerProps {
  layer: any;
  images: any;
  svgs: any;
  setAppState: any;
  appState: any;
}

interface LayerState {
  selected: boolean;
  hovered: boolean;
}

class Layer extends React.Component<LayerProps, LayerState> {
  componentDidMount() {
    console.log(this.props.layer);
  }
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
    const { layer, images, svgs } = this.props;
    switch(layer.type) {
      case 'Image':
        return (
          <Image
            layer={layer}
            images={images}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut} />
        )
      case 'Shape':
        return (
          <Shape
            layer={layer}
            images={images}
            svgs={svgs}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut} />
        )
      case 'ShapePath':
        return  (
          <ShapePath
            layer={layer}
            images={images}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut} />
        )
      case 'Text':
        return (
          <Text
            layer={layer}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut} />
        )
      default:
        return <div className='c-layer' />
    }
  }
}

export default Layer;
