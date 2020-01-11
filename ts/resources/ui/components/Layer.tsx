import React from 'react';
import Image from './Image';
import ShapePath from './ShapePath';
import Shape from './Shape';
import Text from './Text';

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
        <Image
          layer={layer}
          images={images}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'Shape':
      return (
        <Shape
          layer={layer}
          images={images}
          svgs={svgs}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'ShapePath':
      return  (
        <ShapePath
          layer={layer}
          images={images}
          svgs={svgs}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'Text':
      return (
        <Text
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
