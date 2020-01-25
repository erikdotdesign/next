import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../utils';

interface HoverRulesProps {
  hover: srm.AppLayer;
  artboard: srm.Artboard;
  selection: srm.AppLayer;
  zoom: number;
}

const HoverRules = (props: HoverRulesProps) => {
  const { hover, artboard, selection, zoom } = props;
  const hoverOrigin: srm.Origin = getOrigin(hover, artboard);
  const selectionOrigin: srm.Origin = getOrigin(selection, artboard);
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