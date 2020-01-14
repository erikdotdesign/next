import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../utils';

interface HoverRulesProps {
  hover: any;
  selection: any;
  zoom: number;
}

const HoverRules = (props: HoverRulesProps) => {
  const hoverFrame = props.hover.frame;
  const selectionFrame = props.selection.frame;
  const hoverOrigin = getOrigin(hoverFrame);
  const selectionOrigin = getOrigin(selectionFrame);
  return (
    <div className='c-hover__rules'>
      {
        selectionOrigin.yCenter < hoverOrigin.top
        ? <HoverRulesTop
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={props.zoom} />
        : null
      }
      {
        selectionOrigin.xCenter > hoverOrigin.right
        ? <HoverRulesRight
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={props.zoom} />
        : null
      }
      {
        selectionOrigin.yCenter > hoverOrigin.bottom
        ? <HoverRulesBottom
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={props.zoom} />
        : null
      }
      {
        selectionOrigin.xCenter < hoverOrigin.left
        ? <HoverRulesLeft
            hoverOrigin={hoverOrigin}
            selectionOrigin={selectionOrigin}
            zoom={props.zoom} />
        : null
      }
    </div>
  );
}

export default HoverRules;