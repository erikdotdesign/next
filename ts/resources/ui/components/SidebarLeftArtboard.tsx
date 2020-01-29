import React from 'react';
import SidebarLeftLayerName from './SidebarLeftLayerName';
import SidebarLeftLayerNotes from './SidebarLeftLayerNotes';
import { getLayerNotes } from '../utils';
import ThemeContext from './ThemeContext';

interface SidebarLeftArtboardProps {
  artboard: srm.Artboard;
  selection: srm.AppLayer | null;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
}

const SidebarLeftArtboard = (props: SidebarLeftArtboardProps) => {
  const { artboard, selection, notes, setSelection, setGroupSelection, setGroupSelectionNest, setHover } = props;
  const handleDoubleClick = () => {
    setGroupSelection(null);
    setGroupSelectionNest(null);
  }
  const artboardNotes = getLayerNotes(artboard.id, notes);
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          onClick={() => setSelection(artboard)}
          onDoubleClick={handleDoubleClick}
          onMouseOver={() => setHover(artboard)}
          onMouseOut={() => setHover(null)}
          className={ `c-sidebar-left__layer c-sidebar-left__layer--header ${
            selection && artboard.id === selection.id
            ? 'c-sidebar-left__layer--active'
            : null
          }`}
          style={{
            background: theme.background.dark,
            boxShadow: `0px -1px 0px 0px ${theme.background.lighter} inset`,
          }}>
          <SidebarLeftLayerName name={artboard.name} />
          <SidebarLeftLayerNotes notes={artboardNotes} />
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarLeftArtboard;