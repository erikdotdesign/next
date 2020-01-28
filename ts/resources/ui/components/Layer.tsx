import React from 'react';
import LayerGroup from './LayerGroup';
import LayerImage from './LayerImage';
import LayerShapePath from './LayerShapePath';
import LayerShape from './LayerShape';
import LayerText from './LayerText';

interface LayerProps {
  layer: srm.AppArtboardLayer;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
}

const Layer = (props: LayerProps) => {
  const { layer, images, svgs, setSelection, setGroupSelection, setHover } = props;
  const onClick = () => {
    setSelection(layer);
  }
  const onDoubleClick = () => {
    setGroupSelection(layer as srm.Group);
  }
  const onMouseOver = () => {
    setHover(layer);
  }
  const onMouseOut = () => {
    setHover(null);
  }
  switch(layer.type) {
    case 'Group':
      return (
        <LayerGroup
          layer={layer as srm.Group}
          images={images}
          svgs={svgs}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          setSelection={props.setSelection}
          setGroupSelection={props.setGroupSelection}
          setHover={props.setHover} />
      )
    case 'Image':
      return (
        <LayerImage
          layer={layer as srm.Image}
          images={images}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'Shape':
      return (
        <LayerShape
          layer={layer as srm.Shape}
          images={images}
          svgs={svgs}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'ShapePath':
      return  (
        <LayerShapePath
          layer={layer as srm.ShapePath}
          images={images}
          svgs={svgs}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    case 'Text':
      return (
        <LayerText
          layer={layer as srm.Text}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut} />
      )
    default:
      return <div className='c-layer' />
  }
}

export default Layer;
