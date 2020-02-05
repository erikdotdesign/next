import React, { useState } from 'react';
import SidebarLeftLayerName from './SidebarLeftLayerName';
import SidebarLeftLayerNotes from './SidebarLeftLayerNotes';
import ThemeContext from './ThemeContext';
import { getLayerNotes } from '../utils';

interface SidebarLeftGroupHeadProps {
  layer: srm.Group | srm.Artboard;
  index?: number;
  selection: srm.AppLayer | null;
  hover: srm.AppLayer | null;
  groupSelection: srm.Group | null;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest?(groupSelectionNest: srm.Group[] | null): void;
}

const SidebarLeftGroupHead = (props: SidebarLeftGroupHeadProps) => {
  const { layer, index, selection, hover, groupSelection, notes, setSelection, setHover, setGroupSelection, setGroupSelectionNest } = props;
  const isArtboard = layer.type === 'Artboard';
  const isActiveGroup = groupSelection && layer.id === groupSelection.id;
  const artboardNotes = isArtboard ? getLayerNotes((layer as srm.Artboard).id, notes) : undefined;
  const layerNotes = isActiveGroup ? getLayerNotes((layer as srm.Group).id, notes) : undefined;
  const isSelected = selection && layer.id === selection.id;
  const isHover = hover && layer.id === hover.id;
  const handleDoubleClick = () => {
    if (isArtboard) {
      setGroupSelection(null);
      //@ts-ignore
      setGroupSelectionNest(null);
    } else {
      setGroupSelection(layer as srm.Group);
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
      return theme.background.z2;
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
          onClick={() => setSelection(layer)}
          onDoubleClick={handleDoubleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className='c-sidebar-left__layer c-sidebar-left__layer--header'
          style={{
            background: getBackground(theme),
            boxShadow: `0px -1px 0px 0px ${theme.background.z5} inset`,
            // for tooltips to display properly
            zIndex: isHover ? 9999999 : 'initial'
          }}>
          <SidebarLeftLayerName
            name={layer.name}
            color={getColor(theme)}
            paddingLeft={
              isArtboard
              ? 0
              : (index as number + 1) * 8
            } />
          <SidebarLeftLayerNotes
            notes={layerNotes} />
          {
            isArtboard && !groupSelection
            ? <SidebarLeftLayerNotes
                notes={artboardNotes} />
            : null
          }
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarLeftGroupHead;