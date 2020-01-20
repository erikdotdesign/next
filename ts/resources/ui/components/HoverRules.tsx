import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../utils';

interface HoverRulesProps {
  hover: srm.AppLayer;
  selection: srm.AppLayer;
  zoom: number;
}

const HoverRules = (props: HoverRulesProps) => {
  const { hover, selection, zoom } = props;
  const hoverFrame: srm.Rectangle = hover.frame;
  const selectionFrame: srm.Rectangle = selection.frame;
  const hoverOrigin: srm.Origin = getOrigin(hoverFrame);
  const selectionOrigin: srm.Origin = getOrigin(selectionFrame);
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