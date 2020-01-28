import React from 'react';

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
  return (
    <div
      className={ `c-sidebar-left__layer c-sidebar-left__layer--header ${
        selection && artboard.id === selection.id
        ? 'c-sidebar-left__layer--active'
        : null
      }`}
      onClick={() => setSelection(artboard)}
      onDoubleClick={handleDoubleClick}
      onMouseOver={() => setHover(artboard)}
      onMouseOut={() => setHover(null)}>
      <span className='c-sidebar-left-layer__name'>
        {artboard.name}
      </span>
    </div>
  )
};

export default SidebarLeftArtboard;