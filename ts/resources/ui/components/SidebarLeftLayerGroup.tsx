import React, { useState } from 'react';
import SidebarLeftLayers from './SidebarLeftLayers';
import IconTriRight from './IconTriRight';
import IconTriDown from './IconTriDown';
import IconFolderClosed from './IconFolderClosed';
import IconFolderOpen from './IconFolderOpen';

interface SidebarLeftLayerGroupProps {
  layer: srm.Group;
}

const SidebarLeftLayerGroup = (props: SidebarLeftLayerGroupProps) => {
  const [showContents, setShowContents] = useState(false);
  const { layer } = props;
  return (
    <div className='c-sidebar-left__group'>
      <div className='c-sidebar-left__layer c-sidebar-left__layer--group'>
        <button
          className='c-sidebar-left-layer__icon c-sidebar-left-layer__icon--expand'
          onClick={() => setShowContents(!showContents)}>
          {
            showContents
            ? <IconTriDown />
            : <IconTriRight />
          }
        </button>
        <div className='c-sidebar-left-layer__icon'>
          {
            showContents
            ? <IconFolderOpen />
            : <IconFolderClosed />
          }
        </div>
        <span className='c-sidebar-left-layer__name'>
          {layer.name}
        </span>
      </div>
      {
        showContents
        ? <SidebarLeftLayers
            layers={layer.layers as srm.AppArtboardLayer[]} />
        : null
      }
    </div>
  )
};

export default SidebarLeftLayerGroup;