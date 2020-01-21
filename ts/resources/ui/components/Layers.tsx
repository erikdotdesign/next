import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: srm.AppArtboardLayer[];
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
  style: any;
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
}

const Layers = (props: LayersProps) => {
  return (
    <div className='c-layers' style={props.style}>
      {
        props.layers.map((layer: srm.AppArtboardLayer, index: number) => (
          <Layer
            layer={layer}
            key={index}
            images={props.images}
            svgs={props.svgs}
            setSelection={props.setSelection}
            setHover={props.setHover} />
        ))
      }
    </div>
  )
};

export default Layers;
