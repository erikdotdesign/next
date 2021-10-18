import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: next.AppArtboardLayer[];
  images: next.ImgAsset[];
  svgs: next.SvgAsset[];
  setSelection(selection: next.AppLayer | null): void;
  setGroupSelection(groupSelection: next.Group | null): void;
  setHover(hover: next.AppLayer | null): void;
}

const Layers = (props: LayersProps) => {
  return (
    <div className='c-layers'>
      {
        props.layers.map((layer: next.AppArtboardLayer, index: number) => (
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
