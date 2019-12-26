import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: any;
  images: any;
  setAppState: any;
  appState: any;
}

class Layers extends React.Component<LayersProps, {}> {
  render() {
    return (
      <div className='c-layers'>
        {
          this.props.layers.map((layer: any, index: number) => (
            <Layer
              layer={layer}
              key={index}
              images={this.props.images}
              setAppState={this.props.setAppState}
              appState={this.props.appState} />
          ))
        }
      </div>
    );
  }
}

export default Layers;
