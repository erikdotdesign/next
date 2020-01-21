import React from 'react';
import SidebarLeftLayerGroup from './SidebarLeftLayerGroup';
import SidebarLeftLayerShape from './SidebarLeftLayerShape';
import SidebarLeftLayerImage from './SidebarLeftLayerImage';
import SidebarLeftLayerShapePath from './SidebarLeftLayerShapePath';
import SidebarLeftLayerText from './SidebarLeftLayerText';

interface SidebarLeftLayerProps {
  layer: srm.AppArtboardLayer;
}

const SidebarLeftLayer = (props: SidebarLeftLayerProps) => {
  const { layer } = props;
  switch(layer.type) {
    case 'Group':
      return <SidebarLeftLayerGroup layer={layer as srm.Group} />
    case 'Image':
      return <SidebarLeftLayerImage layer={layer as srm.Image} />
    case 'Shape':
      return <SidebarLeftLayerShape layer={layer as srm.Shape} />
    case 'ShapePath':
      return <SidebarLeftLayerShapePath layer={layer as srm.ShapePath} />
    case 'Text':
      return <SidebarLeftLayerText layer={layer as srm.Text} />
    default:
      return (
        <div className='c-sidebar-left__layer'>
          <span>{layer.name}</span>
        </div>
      )
  }
};

export default SidebarLeftLayer;