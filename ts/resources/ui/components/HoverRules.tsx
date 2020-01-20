import React from 'react';
import HoverRulesTop from './HoverRulesTop';
import HoverRulesRight from './HoverRulesRight';
import HoverRulesBottom from './HoverRulesBottom';
import HoverRulesLeft from './HoverRulesLeft';
import { getOrigin } from '../utils';

interface HoverRulesProps {
  hover: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text;
  selection: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text;
  zoom: number;
}

const HoverRules = (props: HoverRulesProps) => {
  const { hover, selection, zoom } = props;
  const hoverFrame = hover.frame;
  const selectionFrame = selection.frame;
  const hoverOrigin = getOrigin(hoverFrame);
  const selectionOrigin = getOrigin(selectionFrame);
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