import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

interface BackButtonProps {
  artboard: srm.Artboard;
  groupSelectionNest: srm.Group[] | null;
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
}

const BackButton = (props: BackButtonProps) => {
  const { artboard, groupSelectionNest, setSelection, setGroupSelection, setGroupSelectionNest } = props;
  const [hovering, setHovering] = useState(false);
  const handleClick = () => {
    if (groupSelectionNest) {
      if (groupSelectionNest.length === 1) {
        setSelection(artboard);
        setGroupSelection(null);
        setGroupSelectionNest(null);
      } else {
        const nextItem = groupSelectionNest[groupSelectionNest.length - 2];
        setSelection(nextItem);
        setGroupSelection(nextItem);
      }
    }
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          className='c-back-button'
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={handleClick}
          style={{
            color: theme.text.base,
            background: hovering ? theme.background.z3 : theme.background.z2,
            boxShadow: `0px 0px 0px 1px ${hovering ? theme.background.z6 : theme.background.z4}`
          }}>
          Go back
        </button>
      )}
    </ThemeContext.Consumer>
  )
};

export default BackButton;
