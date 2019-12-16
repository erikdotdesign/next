import React from 'react';
import chroma from 'chroma-js';

interface LayerProps {
  layer: any;
}

class Layer extends React.Component<LayerProps, {}> {
  componentDidMount() {
    console.log(this.props.layer.style.fills);
  }
  getFills = (fills: any) => {
    // 1. define fill type [Color, Gradient, Pattern]
    // 2. transform fill into css
    // 3. return css
    const backgrounds: any[] = [];

    fills.map((fill: any, index: number) => {
      switch(fill.fillType) {
        case 'Color':
          backgrounds.push({backgroundColor: fill.color});
          break;
        case 'Gradient':
          let stops: string[] = [];
          let size: string = '';
          let position: string = '';
          let background: string = '';
          let backgroundSize: string = '';

          switch(fill.gradient.gradientType) {
            case 'Linear':
              break;
            // does not support gradient rotation
            case 'Radial':
              // add layer stops
              fill.gradient.stops.map((stop: any) => {
                stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
              });
              // set radial gradient size
              if (fill.gradient.aspectRatio !== 0) {
                size = `${(fill.gradient.aspectRatio * 100).toFixed(2)}% ${(fill.gradient.to.y * 100).toFixed(2)}%`
              } else {
                size = `100% ${(fill.gradient.to.y * 100).toFixed(2)}%`
              }
              // set radial gradient position
              position = `${(fill.gradient.from.x * 100).toFixed(2)}% ${(fill.gradient.from.y * 100).toFixed(2)}%`;
              // set background
              background = `radial-gradient(${size} at ${position},${stops.join()})`;
              break;
            // limited browser support for conic-gradients
            case 'Angular':
              const firstStop = fill.gradient.stops[0];
              const lastStop = fill.gradient.stops[fill.gradient.stops.length - 1];
              const midColor = chroma.mix(firstStop.color, lastStop.color, 0.5);
              // add first stop
              stops.push(`${midColor} 0turn`);
              // add layer stops
              fill.gradient.stops.map((stop: any) => {
                stops.push(`${stop.color} ${(stop.position).toFixed(2)}turn`);
              });
              // add last stop
              stops.push(`${midColor} 1turn`);
              // default sketch angular gradient starts at 3:00
              // default css conic-gradient starts at 12:00
              // add 0.25turn to translate properly
              position = `from 0.25turn`;
              background = `conic-gradient(${position},${stops.join()})`;
              break;
          }
          // push finalized gradient to backgrounds
          backgrounds.push({background: background});
          break;
        case 'Pattern':
          break;
      }
    })

    return backgrounds;
  }
  getDims = (frame: any) => {
    // 1. get frame dims and position
    // 2. transform into css
    // 3. return css
    return {
      transform: `translateX(${frame.x}px) translateY(${frame.y}px)`,
      width: frame.width,
      height: frame.height,
    }
  }
  getStyles = (style: any, frame: any) => {
    // return css style object
    const dims = this.getDims(frame);
    const fills = this.getFills(style.fills);
    console.log(fills);

    return {
      ...dims,
      ...fills[0]
    }
  }
  render() {
    const { frame, style } = this.props.layer;
    return (
      <div
        className='c-layer'
        style={this.getStyles(style, frame)} />
    );
  }
}

export default Layer;
