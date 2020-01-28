import React from 'react';
import IconTriRight from './IconTriRight';
import { getLayerNotes, getNestedNoteCount } from '../utils';

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
  const { layer, selection, notes, setHover, setSelection, setGroupSelection, nestPadding } = props;
  const layerNotes = getLayerNotes(layer.id, notes);
  const nestedNotes = layer.type === 'Group' ? getNestedNoteCount(layer, notes) : null;
  switch(layer.type) {
    case 'Group':
      return (
        <div className={ `c-sidebar-left__layer c-sidebar-left__layer--group ${
          selection && layer.id === selection.id
          ? 'c-sidebar-left__layer--active'
          : null
        }`}>
          <span className='c-sidebar-left-layer__name'>
            <span style={{paddingLeft: `${nestPadding}px`}}>
              {layer.name}
            </span>
          </span>
          {
            nestedNotes && nestedNotes > 0
            ? <span className='c-sidebar-left-layer__nested-note-count'>
                { nestedNotes }
              </span>
            : null
          }
          {
            layerNotes
            ? <span className='c-sidebar-left-layer__note-count'>
                { layerNotes.notes.length }
              </span>
            : null
          }
          <span className='c-sidebar-left-layer__icon c-sidebar-left-layer__icon--expand'>
            <IconTriRight />
          </span>
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
          {
            layerNotes
            ? <span className='c-sidebar-left-layer__note-count'>
                { layerNotes.notes.length }
              </span>
            : null
          }
        </div>
      )
  }
};

export default SidebarLeftLayer;