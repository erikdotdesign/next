import React, { useState }  from 'react';
import SidebarLeftLayerName from './SidebarLeftLayerName';
import SidebarLeftLayerNotes from './SidebarLeftLayerNotes';
import SidebarLeftLayerNotesNested from './SidebarLeftLayerNotesNested';
import IconTriRight from './IconTriRight';
import ThemeContext from './ThemeContext';
import { getLayerNotes, getNestedNoteCount } from '../utils';

interface SidebarLeftLayerProps {
  layer: next.AppLayer;
  selection: next.AppLayer | null;
  hover: next.AppLayer | null;
  notes: next.Note[];
  setSelection(selection: next.AppLayer | null): void;
  setHover(hover: next.AppLayer | null): void;
  setGroupSelection(groupSelection: next.Group | null): void;
  nestPadding?: number;
}

const SidebarLeftLayer = (props: SidebarLeftLayerProps) => {
  const { layer, selection, hover, notes, setHover, setGroupSelection, setSelection, nestPadding } = props;
  const isGroup = layer.type === 'Group';
  const isSelected = selection && layer.id === selection.id;
  const isHover = hover && layer.id === hover.id;
  const layerNotes = getLayerNotes(layer.id, notes);
  const nestedNotes = isGroup ? getNestedNoteCount(layer, notes) : null;
  const handleDoubleClick = () => {
    if (isGroup) {
      setGroupSelection(layer as next.Group);
    } else {
      return;
    }
  }
  const handleMouseOver = () => {
    setHover(layer);
  }
  const handleMouseOut = () => {
    setHover(null);
  }
  const getBackground = (theme: any) => {
    if (isSelected) {
      return isHover ? theme.palette.primaryHover : theme.palette.primary;
    } else if (isHover) {
      return theme.background.z3;
    } else {
      return theme.background.z1;
    }
  }
  const getColor = (theme: any) => {
    if (isSelected) {
      return theme.text.onPrimary;
    } else {
      return theme.text.base;
    }
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          onDoubleClick={handleDoubleClick}
          onClick={() => setSelection(layer)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={`c-sidebar-left__layer ${isGroup ? 'c-sidebar-left__layer--group' : null}`}
          style={{
            background: getBackground(theme),
            // for tooltips to display properly
            zIndex: isHover ? 9999999 : 'initial'
          }}>
          <SidebarLeftLayerName
            name={layer.name}
            color={getColor(theme)}
            paddingLeft={nestPadding as number} />
          {
            isGroup
            ? <SidebarLeftLayerNotesNested
                nestedNotes={nestedNotes as number} />
            : null
          }
          <SidebarLeftLayerNotes
            notes={layerNotes} />
          {
            isGroup
            ? <span className='c-sidebar-left-layer__icon'>
                <IconTriRight
                  style={{fill: getColor(theme)}} />
              </span>
            : null
          }
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarLeftLayer;