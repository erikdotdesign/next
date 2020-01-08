import React from 'react';
import SidebarLayerValue from './SidebarLayerValue';
import SidebarLayerProp from './SidebarLayerProp';

import artboardStyles from '../styles/artboardStyles';
import shapeStyles from '../styles/shapeStyles';
import shapePathStyles from '../styles/shapePathStyles';
import imageStyles from '../styles/imageStyles';
import pathStyles from '../styles/pathStyles';
import { textContainerStyles, textStyles } from '../styles/textStyles';

interface SidebarProps {
  layer: any;
  images: any;
  svgs: any;
}

const SidebarLayer = (props: SidebarProps) => {
  const { layer, images, svgs } = props;
  const getLayerStyles = () => {
    switch(layer.type) {
      case 'Shape':
        return {...shapeStyles(layer), ...pathStyles(layer, svgs)};
      case 'ShapePath':
        return shapePathStyles(layer, images, svgs);
      case 'Image':
        return imageStyles(layer, images);
      case 'Text':
        return {...textContainerStyles(layer), ...textStyles(layer)};
      case 'Artboard':
        return artboardStyles(layer);
    }
  }
  const layerStyles: any = getLayerStyles();
  return (
    <div className='c-sidebar__layer'>
      <h2 className='c-sidebar-layer__name'>{layer.name}</h2>
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