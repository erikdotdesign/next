import React from 'react';
import LayerImage from './LayerImage';
import LayerShapePath from './LayerShapePath';
import LayerShape from './LayerShape';
import LayerText from './LayerText';

interface LayerProps {
  layer: any;
  images: any;
  svgs: any;
  setSelection: any;
  setHover: any;
}

const Layer = (props: LayerProps) => {
  const { layer, images, svgs, setSelection, setHover } = props;
  const onClick = () => {
    setSelection(props.layer);
  }
  const onMouseOver = () => {
    setHover(props.layer);
  }
  const onMouseOut = () => {
    setHover('');
  }
  switch(layer.type) {
    case 'Image':
      return (
        <LayerImage
          layer={layer}
          images={images}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'Shape':
      return (
        <LayerShape
          layer={layer}
          images={images}
          svgs={svgs}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'ShapePath':
      return  (
        <LayerShapePath
          layer={layer}
          images={images}
          svgs={svgs}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'Text':
      return (
        <LayerText
          layer={layer}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    default:
      return <div className='c-layer' />
  }
}

export default Layer;
