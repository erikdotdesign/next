import React from 'react';
import createLayerStyles from '../../utils/layerStyles';

interface LayerProps {
  layer: any;
  images?: any;
}

class Layer extends React.Component<LayerProps, {}> {
  componentDidMount() {
    console.log(this.props.layer.style.fills[0]);
  }
  render() {
    const { layer, images } = this.props;
    return (
      <div
        className='c-layer'
        style={createLayerStyles(layer, images)} />
    );
  }
}

export default Layer;
