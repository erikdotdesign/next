import React from 'react';
import Layers from './Layers';
import groupSelectionStyles, { groupSelectionArtboardStyles } from '../styles/groupSelectionStyles';

interface GroupSelectionProps {
  artboard: srm.Artboard;
  groupSelection: srm.Group;
  images: srm.ImgAsset[];
  svgs: srm.SvgAsset[];
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setHover(hover: srm.AppLayer | null): void;
}

const GroupSelection = (props: GroupSelectionProps) => {
  const { groupSelection, artboard, images, svgs, setSelection, setGroupSelection, setHover } = props;
  return (
    <div className='c-group-selection'>
      <div
        className='c-group-selection__artboard'
        style={groupSelectionArtboardStyles(groupSelection, artboard)}>
        <div
          className='c-layer c-layer--group'
          style={groupSelectionStyles(groupSelection)}>
            <Layers
              layers={groupSelection.layers as srm.AppArtboardLayer[]}
              images={images}
              svgs={svgs}
              setSelection={setSelection}
              setGroupSelection={setGroupSelection}
              setHover={setHover} />
            <div
              className='c-group-selection__click-area'
              onClick={() => setSelection(groupSelection)}
              onMouseOver={() => setHover(groupSelection)}
              onMouseOut={() => setHover(null)} />
        </div>
      </div>
      <div className='c-group-selection__scrim' />
    </div>
  )
};

export default GroupSelection;
