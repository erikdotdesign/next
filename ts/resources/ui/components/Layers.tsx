import React from 'react';
import Layer from './Layer';

interface LayersProps {
  artboard: any;
  images: any;
  svgs: any;
  setAppState: any;
  appState: any;
}

const Layers = (props: LayersProps) => {
  const onClick = () => {
    props.setAppState({
      selection: ''
    });
  }
  const onMouseOver = () => {
    props.setAppState({
      hover: props.artboard
    });
  }
  return (
    <div
      className='c-layers'
      style={{
        width: `${props.artboard.frame.width}px`,
        height: `${props.artboard.frame.height}px`
      }}>
      {
        props.artboard.layers.map((layer: any, index: number) => (
          <Layer
            layer={layer}
            key={index}
            images={props.images}
            svgs={props.svgs}
            setAppState={props.setAppState}
            appState={props.appState} />
        ))
      }
      <div
        className='c-layers__click-area'
        onClick={onClick}
        onMouseOver={onMouseOver} />
    </div>
  )
};

export default Layers;
