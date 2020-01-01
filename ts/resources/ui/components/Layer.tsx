import React from 'react';
import Image from './Image';
import ShapePath from './ShapePath';
import Shape from './Shape';
import Text from './Text';

interface LayerProps {
  layer: any;
  images: any;
  svgs: any;
  setAppState: any;
  appState: any;
}

const Layer = (props: LayerProps) => {
  const { layer, images, svgs } = props;
  const onClick = () => {
    props.setAppState({
      selection: props.layer
    });
  }
  const onMouseOver = () => {
    props.setAppState({
      hover: props.layer
    });
  }
  const onMouseOut = () => {
    props.setAppState({
      hover: ''
    });
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
