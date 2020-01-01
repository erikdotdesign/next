import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: any;
  images: any;
  svgs: any;
  setAppState: any;
  appState: any;
}

const Layers = (props: LayersProps) => (
  <div className='c-layers'>
    {
      props.layers.map((layer: any, index: number) => (
        <Layer
          layer={layer}
          key={index}
          images={props.images}
          svgs={props.svgs}
          setAppState={props.setAppState}
          appState={props.appState} />
      ))
    }
  </div>
);

export default Layers;
