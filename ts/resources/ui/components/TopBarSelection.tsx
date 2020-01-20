import React from 'react';

interface TopBarSelectionProps {
  selection: srm.AppLayer | null;
}

const TopBarSelection = (props: TopBarSelectionProps) => {
  const { selection } = props;
  return (
    <div className='c-topbar__selection'>
      {
        selection
        ? <span>{selection.name}</span>
        : null
      }
    </div>
  );
}

export default TopBarSelection;