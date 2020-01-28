import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: srm.AppArtboardLayer[];
  images: srm.Asset[];
  svgs: srm.Asset[];
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setHover(hover: srm.AppLayer | null): void;
}

const Layers = (props: LayersProps) => {
  return (
    <div className='c-layers'>
      {
        props.layers.map((layer: srm.AppArtboardLayer, index: number) => (
          <Layer
            layer={layer}
            key={index}
            images={props.images}
            svgs={props.svgs}
            setSelection={props.setSelection}
            setGroupSelection={props.setGroupSelection}
            setHover={props.setHover} />
        ))
      }
    </div>
  )
};

export default Layers;
