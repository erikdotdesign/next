import React from 'react';
import ThemeContext from './ThemeContext';

import {
  createRuleTopStyles,
  createRuleRightStyles,
  createRuleBottomStyles,
  createRuleLeftStyles
} from '../styles/hoverStyles'

interface HoverRuleProps {
  hoverOrigin: next.Origin;
  side: 'top' | 'right' | 'bottom' | 'left';
  sideAlt: 'top' | 'right' | 'bottom' | 'left';
  selectionOrigin: next.Origin;
  zoom: number;
}

const HoverRule = (props: HoverRuleProps) => {
  const { hoverOrigin, selectionOrigin, side, sideAlt, zoom } = props;
  const getRuleStyles = (color: string) => {
    switch(side) {
      case 'top':
        return createRuleTopStyles(hoverOrigin, selectionOrigin, zoom, color);
      case 'right':
        return createRuleRightStyles(hoverOrigin, selectionOrigin, zoom, color);
      case 'bottom':
        return createRuleBottomStyles(hoverOrigin, selectionOrigin, zoom, color);
      case 'left':
        return createRuleLeftStyles(hoverOrigin, selectionOrigin, zoom, color);
    }
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className={`c-hover__rule c-hover__rule--${side}-${sideAlt}`}
          style={getRuleStyles(theme.palette.primary)} />
      )}
    </ThemeContext.Consumer>
  );
}

export default HoverRule;