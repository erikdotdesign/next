import React from 'react';
import Layers from './Layers';
import { createBaseLayerStyles } from '../styles/layerStyles';

interface LayerGroupProps {
  layer: srm.Group;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const LayerGroup = (props: LayerGroupProps) => {
  const { layer, images, svgs } = props;
  return (
    <div
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      className='c-layer c-layer--group'
      style={createBaseLayerStyles(layer)}>
      <Layers
        layers={layer.layers as srm.AppArtboardLayer[]}
        images={images}
        svgs={svgs} />
    </div>
  )
};

export default LayerGroup;
