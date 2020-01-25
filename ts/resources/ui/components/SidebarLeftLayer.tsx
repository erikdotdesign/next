import React from 'react';
import IconTriRight from './IconTriRight';

interface SidebarLeftLayerProps {
  layer: srm.AppLayer;
  selection: srm.AppLayer | null;
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  nestPadding?: number;
}

const SidebarLeftLayer = (props: SidebarLeftLayerProps) => {
  const { layer, selection, setHover, setSelection, setGroupSelection, nestPadding } = props;
  switch(layer.type) {
    case 'Group':
      return (
        <div className={ `c-sidebar-left__layer ${
          selection && layer.id === selection.id
          ? 'c-sidebar-left__layer--active'
          : null
        }`}>
          <span className='c-sidebar-left-layer__name'>
            <span style={{paddingLeft: `${nestPadding}px`}}>
              {layer.name}
            </span>
          </span>
          <button
            className='c-sidebar-left-layer__icon c-sidebar-left-layer__icon--expand'
            onClick={() => setGroupSelection(layer as srm.Group)}>
            <IconTriRight />
          </button>
          <div
            className='c-sidebar-left__group-click'
            onClick={() => setSelection(layer)}
            onDoubleClick={() => setGroupSelection(layer as srm.Group)}
            onMouseOver={() => setHover(layer)}
            onMouseOut={() => setHover(null)} />
        </div>
      )
    default:
      return (
        <div
          onClick={() => setSelection(layer)}
          onMouseOver={() => setHover(layer)}
          onMouseOut={() => setHover(null)}
          className={ `c-sidebar-left__layer ${
            selection && layer.id === selection.id
            ? 'c-sidebar-left__layer--active'
            : null
          }`}>
          <span className='c-sidebar-left-layer__name'>
            <span style={{paddingLeft: `${nestPadding}px`}}>
              {layer.name}
            </span>
          </span>
        </div>
      )
  }
};

export default SidebarLeftLayer;