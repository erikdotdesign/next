import React from 'react';
import Layers from './Layers';
import ThemeContext from './ThemeContext';
import groupSelectionStyles, { groupSelectionArtboardStyles } from '../styles/groupSelectionStyles';

interface GroupSelectionProps {
  artboard: next.Artboard;
  groupSelection: next.Group;
  images: next.ImgAsset[];
  svgs: next.SvgAsset[];
  setSelection(selection: next.AppLayer | null): void;
  setGroupSelection(groupSelection: next.Group | null): void;
  setHover(hover: next.AppLayer | null): void;
}

const GroupSelection = (props: GroupSelectionProps) => {
  const { groupSelection, artboard, images, svgs, setSelection, setGroupSelection, setHover } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className='c-group-selection'>
          <div
            className='c-group-selection__artboard'
            style={groupSelectionArtboardStyles(groupSelection, artboard)}>
            <div
              className='c-layer c-layer--group'
              style={groupSelectionStyles(groupSelection)}>
                <Layers
                  layers={groupSelection.layers as next.AppArtboardLayer[]}
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
          <div
            className='c-group-selection__scrim'
            style={{background: theme.background.z0}} />
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default GroupSelection;
