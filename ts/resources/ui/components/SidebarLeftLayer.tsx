import React from 'react';
import SidebarLeftLayerGroup from './SidebarLeftLayerGroup';

interface SidebarLeftLayerProps {
  layer: srm.AppArtboardLayer;
  selection: srm.AppLayer | null;
  setSelection(selection: srm.AppLayer | null): void;
}

const SidebarLeftLayer = (props: SidebarLeftLayerProps) => {
  const { layer, selection, setSelection } = props;
  switch(layer.type) {
    case 'Group':
      return <SidebarLeftLayerGroup
                layer={layer as srm.Group}
                selection={selection}
                setSelection={setSelection} />
    default:
      return (
        <div
          className={ `c-sidebar-left__layer ${
            selection && layer.id === selection.id
            ? 'c-sidebar-left__layer--active'
            : null
          }`}
          onClick={() => setSelection(layer)}>
          <span className='c-sidebar-left-layer__name'>
            {layer.name}
          </span>
        </div>
      )
  }
};

export default SidebarLeftLayer;