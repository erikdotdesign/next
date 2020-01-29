import React from 'react';
import SidebarLeftLayerName from './SidebarLeftLayerName';
import SidebarLeftLayerNotes from './SidebarLeftLayerNotes';
import SidebarLeftGroup from './SidebarLeftGroup';
import { getLayerNotes } from '../utils';

interface SidebarLeftLayerProps {
  layer: srm.AppLayer;
  selection: srm.AppLayer | null;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  nestPadding?: number;
}

const SidebarLeftLayer = (props: SidebarLeftLayerProps) => {
  const { layer, selection, notes, setHover, setSelection, nestPadding } = props;
  const layerNotes = getLayerNotes(layer.id, notes);
  switch(layer.type) {
    case 'Group':
      return (
        <SidebarLeftGroup {...props} />
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
          <SidebarLeftLayerName
            name={layer.name}
            style={{paddingLeft: `${nestPadding}px`}} />
          <SidebarLeftLayerNotes
            notes={layerNotes} />
        </div>
      )
  }
};

export default SidebarLeftLayer;