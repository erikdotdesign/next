import React, { useState } from 'react';
import SidebarLeftLayers from './SidebarLeftLayers';
import IconTriRight from './IconTriRight';
import IconTriDown from './IconTriDown';
import IconFolderClosed from './IconFolderClosed';
import IconFolderOpen from './IconFolderOpen';

interface SidebarLeftLayerGroupProps {
  layer: srm.Group;
  selection: srm.AppLayer | null;
  setSelection(selection: srm.AppLayer | null): void;
}

const SidebarLeftLayerGroup = (props: SidebarLeftLayerGroupProps) => {
  const [showContents, setShowContents] = useState(false);
  const { layer, selection, setSelection } = props;
  return (
    <div className='c-sidebar-left__group'>
      <div className={ `c-sidebar-left__layer ${
        selection && layer.id === selection.id
        ? 'c-sidebar-left__layer--active'
        : null
      }`}>
        <button
          className='c-sidebar-left-layer__icon c-sidebar-left-layer__icon--expand'
          onClick={() => setShowContents(!showContents)}>
          {
            showContents
            ? <IconTriDown />
            : <IconTriRight />
          }
        </button>
        {/* <div className='c-sidebar-left-layer__icon'>
          {
            showContents
            ? <IconFolderOpen />
            : <IconFolderClosed />
          }
        </div> */}
        <span className='c-sidebar-left-layer__name'>
          {layer.name}
        </span>
      </div>
      {
        showContents
        ? <SidebarLeftLayers
            layers={layer.layers as srm.AppArtboardLayer[]}
            selection={selection}
            setSelection={setSelection} />
        : null
      }
    </div>
  )
};

export default SidebarLeftLayerGroup;