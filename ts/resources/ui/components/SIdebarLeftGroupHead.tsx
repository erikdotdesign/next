import React from 'react';
import SidebarLeftLayerName from './SidebarLeftLayerName';
import SidebarLeftLayerNotes from './SidebarLeftLayerNotes';
import ThemeContext from './ThemeContext';
import chroma from 'chroma-js';
import { getLayerNotes } from '../utils';

interface SidebarLeftGroupHeadProps {
  layer: srm.Group;
  index: number;
  selection: srm.AppLayer | null;
  groupSelection: srm.Group;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
}

const SidebarLeftGroupHead = (props: SidebarLeftGroupHeadProps) => {
  const { layer, index, selection, groupSelection, notes, setSelection, setHover, setGroupSelection } = props;
  const isActiveGroup = layer.id === groupSelection.id;
  const layerNotes = isActiveGroup ? getLayerNotes(groupSelection.id, notes) : undefined;
  //const isActiveSelection = selection && layer.id === selection.id;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          onClick={() => setSelection(layer)}
          onDoubleClick={() => setGroupSelection(layer)}
          onMouseOver={() => setHover(layer)}
          onMouseOut={() => setHover(null)}
          className='c-sidebar-left__layer c-sidebar-left__layer--header'
          style={{
            background: theme.background.dark,
            boxShadow: `0px -1px 0px 0px ${theme.background.lighter} inset`,
          }}>
          <SidebarLeftLayerName
            name={layer.name}
            style={{paddingLeft: `${(index + 1) * 8}px`}} />
          <SidebarLeftLayerNotes
            notes={layerNotes} />
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarLeftGroupHead;


// style={{
//   background: `${
//     isActiveSelection
//     ? chroma('#EF2EF2').darken((index + 1) * 0.2)
//     : chroma('#333').brighten((index + 1) * 0.2)
//   }`
// }}