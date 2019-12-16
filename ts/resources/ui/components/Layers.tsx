import React from 'react';
import Layer from './Layer';

interface LayersProps {
  layers: any;
}

class Layers extends React.Component<LayersProps, {}> {
  componentDidMount() {
    console.log(this.props.layers);
  }
  render() {
    return (
      <div className='c-layers'>
        {
          this.props.layers.map((layer: any, index: number) => {
            return (
              <Layer layer={layer} key={index} />
            )
          })
        }
      </div>
    );
  }
}

export default Layers;
