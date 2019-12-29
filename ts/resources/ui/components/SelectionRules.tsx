import React from 'react';
import SelectionRulesTop from './SelectionRulesTop';
import SelectionRulesRight from './SelectionRulesRight';
import SelectionRulesBottom from './SelectionRulesBottom';
import SelectionRulesLeft from './SelectionRulesLeft';
import { getOrigin } from '../../utils/appUtils';

interface SelectionRulesProps {
  selectionFrame: any;
  hoverFrame: any;
  artboardFrame: any;
}

class SelectionRules extends React.Component<SelectionRulesProps, {}> {
  render() {
    const { selectionFrame, hoverFrame, artboardFrame } = this.props;
    const selectionOrigin = getOrigin(selectionFrame);
    const hoverOrigin = getOrigin(hoverFrame);
    return (
      <div className='c-selection__rules'>
        {
          selectionOrigin.top > hoverOrigin.top
          ? <SelectionRulesTop
              selectionOrigin={selectionOrigin}
              hoverOrigin={hoverOrigin}
              artboardFrame={artboardFrame} />
          : null
        }
        {
          selectionOrigin.right < hoverOrigin.right
          ? <SelectionRulesRight
              selectionOrigin={selectionOrigin}
              hoverOrigin={hoverOrigin}
              artboardFrame={artboardFrame} />
          : null
        }
        {
          selectionOrigin.bottom < hoverOrigin.bottom
          ? <SelectionRulesBottom
              selectionOrigin={selectionOrigin}
              hoverOrigin={hoverOrigin}
              artboardFrame={artboardFrame} />
          : null
        }
        {
          selectionOrigin.left > hoverOrigin.left
          ? <SelectionRulesLeft
              selectionOrigin={selectionOrigin}
              hoverOrigin={hoverOrigin}
              artboardFrame={artboardFrame} />
          : null
        }
      </div>
    );
  }
}

export default SelectionRules;
