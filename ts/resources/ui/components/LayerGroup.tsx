import React from 'react';
import Layers from './Layers';
import groupStyles from '../styles/groupStyles';

interface LayerGroupProps {
  layer: srm.Group;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  onClick(): void;
  onDoubleClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setHover(hover: srm.AppLayer | null): void;
}

const LayerGroup = (props: LayerGroupProps) => {
  const { layer, images, svgs } = props;
  return (
    <div
      id={layer.id}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      className='c-layer c-layer--group'
      style={groupStyles(layer, svgs)}>
      <Layers
        layers={layer.layers as srm.AppArtboardLayer[]}
        images={images}
        svgs={svgs}
        setSelection={props.setSelection}
        setGroupSelection={props.setGroupSelection}
        setHover={props.setHover} />
    </div>
  )
};

export default LayerGroup;
