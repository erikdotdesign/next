import React from 'react';
import { createShapePathStyles, createBaseLayerStyles } from '../../utils/layerStyles';
import Layer from './Layer';

interface ShapeProps {
  layer: any;
  images: any;
  svgs: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

class Shape extends React.Component<ShapeProps, {}> {
  render() {
    const shapeSvgs = this.props.svgs.filter((svg: any) => {
      return svg.parentId === this.props.layer.id;
    });
    return (
      <div
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        className='c-layer c-layer--shape'
        style={createBaseLayerStyles(this.props.layer)}>
        <svg
          viewBox={`0 0 ${this.props.layer.frame.width} ${this.props.layer.frame.height}`}
          width={this.props.layer.frame.width}
          height={this.props.layer.frame.height}>
          {
            shapeSvgs.map((svg: any, index: number) => (
              <path key={index} d={svg.svgPath} />
            ))
          }
        </svg>
      </div>
    );
  }
}

export default Shape;
