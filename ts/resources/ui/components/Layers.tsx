import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: any;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
  style: any;
  setSelection(selection: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null): void;
  setHover(hover: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null): void;
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
