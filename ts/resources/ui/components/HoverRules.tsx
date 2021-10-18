import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../utils';

interface HoverRulesProps {
  hover: next.AppLayer;
  artboard: next.Artboard;
  selection: next.AppLayer;
  zoom: number;
}

const HoverRules = (props: HoverRulesProps) => {
  const { hover, artboard, selection, zoom } = props;
  const hoverOrigin: next.Origin = getOrigin(hover, artboard);
  const selectionOrigin: next.Origin = getOrigin(selection, artboard);
  return (
    <div className='c-hover__rules'>
      {
        selectionOrigin.yCenter < hoverOrigin.top
        ? <HoverRulesTop
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.xCenter > hoverOrigin.right
        ? <HoverRulesRight
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.yCenter > hoverOrigin.bottom
        ? <HoverRulesBottom
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={zoom} />
        : null
      }
      {
        selectionOrigin.xCenter < hoverOrigin.left
        ? <HoverRulesLeft
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={zoom} />
        : null
      }
    </div>
  );
}

export default HoverRules;