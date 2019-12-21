import React from 'react';
import Layers from './Layers';

interface ArtboardProps {
  artboard: any;
  images?: any;
}

class Artboard extends React.Component<ArtboardProps, {}> {

  componentDidMount() {
    console.log(this.props.artboard);
  }
  render() {
    const { frame, background, layers } = this.props.artboard;
    const bg = background.enabled ? background.color : 'transparent';
    return (
      <div
        className='c-artboard'
        style={{
          width: frame.width,
          height: frame.height,
          background: bg
        }}>
        <Layers layers={layers} images={this.props.images} />
      </div>
    );
  }
}

export default Artboard;
