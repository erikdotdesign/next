import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: any;
  images: any;
  svgs: any;
  setSelection: any;
  setHover: any;
  style: any;
}

const Layers = (props: LayersProps) => {
  return (
    <div className='c-layers' style={props.style}>
      {
        props.layers.map((layer: any, index: number) => (
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
