import React from 'react';
import Layers from './Layers';
import groupSelectionStyles, { groupSelectionScrimStyles } from '../styles/groupSelectionStyles';

interface GroupSelectionProps {
  artboard: srm.Artboard;
  groupSelection: srm.Group;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
  zoom: number;
  setSelection(selection: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
  setHover(hover: srm.AppLayer | null): void;
}

const GroupSelection = (props: GroupSelectionProps) => {
  const { groupSelection, artboard, images, svgs, zoom, setSelection, setGroupSelection, setHover } = props;
  return (
    <div className='c-group-selection'>
      <div
        className='c-group-selection__group c-layer'
        style={groupSelectionStyles(groupSelection, artboard, zoom)}>
        <Layers
          layers={groupSelection.layers as srm.AppArtboardLayer[]}
          images={images}
          svgs={svgs}
          setSelection={setSelection}
          setGroupSelection={setGroupSelection}
          setHover={setHover} />
      </div>
      <div
        className='c-group-selection__scrim'
        style={groupSelectionScrimStyles(artboard)} />
    </div>
  )
};

export default GroupSelection;
