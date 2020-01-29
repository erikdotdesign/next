import React from 'react';
import ThemeContext from './ThemeContext';

interface BackButtonProps {
  groupSelectionNest: srm.Group[] | null;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setGroupSelectionNest(groupSelectionNest: srm.Group[] | null): void;
}

const BackButton = (props: BackButtonProps) => {
  const { groupSelectionNest, setGroupSelection, setGroupSelectionNest } = props;
  const handleClick = () => {
    if (groupSelectionNest) {
      if (groupSelectionNest.length === 1) {
        setGroupSelection(null);
        setGroupSelectionNest(null);
      } else {
        const nextItem = groupSelectionNest[groupSelectionNest.length - 2];
        setGroupSelection(nextItem);
      }
    }
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          className='c-back-button'
          onClick={handleClick}
          style={{
            color: theme.text.base,
            background:
              theme.theme === 'dark'
              ? theme.background.dark
              : theme.background.darker,
            boxShadow:
              theme.theme === 'dark'
              ? `0px 0px 0px 1px ${theme.background.light}`
              : `0px 0px 0px 1px ${theme.background.base}`
          }}>
          Go back
        </button>
      )}
    </ThemeContext.Consumer>
  )
};

export default BackButton;
