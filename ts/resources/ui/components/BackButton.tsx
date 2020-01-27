import React from 'react';

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
    <button
      className='c-back-button'
      onClick={handleClick}>
      Go back
    </button>
  )
};

export default BackButton;
