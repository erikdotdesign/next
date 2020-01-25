import React, { useEffect } from 'react';
import Layers from './Layers';
import groupSelectionStyles from '../styles/groupSelection';

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
  const getScrimBackground = () => {
    const { background } = artboard;
    const { color, enabled } = background;
    return enabled ? color : '#111';
  }
  useEffect(() => {
    setSelection(groupSelection);
  }, [groupSelection]);
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
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          right: '0px',
          bottom: '0px',
          background: getScrimBackground(),
          opacity: 0.8
        }} />
    </div>
  )
};

export default GroupSelection;
