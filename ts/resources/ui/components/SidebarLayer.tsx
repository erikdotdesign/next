import React from 'react';
import SidebarLayerValue from './SidebarLayerValue';
import SidebarLayerProp from './SidebarLayerProp';

import {
  createShapeStyles,
  createShapePathStyles,
  createArtboardStyles,
  createImageStyles
} from '../../utils/layerStyles';

import {
  textContainerStyles,
  textStyles
} from '../../utils/textStyles';

interface SidebarProps {
  layer: any;
  images: any;
}

const SidebarLayer = (props: SidebarProps) => {
  const getLayerStyles = () => {
    switch(props.layer.type) {
      case 'Shape':
        return createShapeStyles(props.layer);
      case 'ShapePath':
        return createShapePathStyles(props.layer, props.images);
      case 'Image':
        return createImageStyles(props.layer, props.images);
      case 'Text':
        return {...textContainerStyles(props.layer), ...textStyles(props.layer)};
      case 'Artboard':
        return createArtboardStyles(props.layer);
    }
  }
  const layerStyles: any = getLayerStyles();
  return (
    <div className='c-sidebar__layer'>
      <h2 className='c-sidebar-layer__name'>{props.layer.name}</h2>
      <div className='c-sidebar-layer__styles'>
        {
          Object.keys(layerStyles).map((key: any, index: number) => (
            <div className='c-sidebar-layer__css' key={index}>
              <SidebarLayerProp prop={key} />
              <SidebarLayerValue value={layerStyles[key]} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SidebarLayer;