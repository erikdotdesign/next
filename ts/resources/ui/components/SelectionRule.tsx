import React from 'react';
import LayerDim from './LayerDim';
import ThemeContext from './ThemeContext';

import {
  createRuleTopStyles,
  createRuleRightStyles,
  createRuleBottomStyles,
  createRuleLeftStyles,
  createDimTopBottomStyles,
  createDimRightLeftStyles
} from '../styles/selectionStyles'

interface SelectionRuleProps {
  selectionOrigin: next.Origin;
  side: 'top' | 'right' | 'bottom' | 'left';
  hoverOrigin: next.Origin;
  artboardFrame: next.Rectangle;
  zoom: number;
}

const SelectionRule = (props: SelectionRuleProps) => {
  const { selectionOrigin, side, hoverOrigin, artboardFrame, zoom } = props;
  const getRuleStyles = (color: string) => {
    switch(side) {
      case 'top':
        return createRuleTopStyles(selectionOrigin, hoverOrigin, zoom, color);
      case 'right':
        return createRuleRightStyles(selectionOrigin, hoverOrigin, zoom, color);
      case 'bottom':
        return createRuleBottomStyles(selectionOrigin, hoverOrigin, zoom, color);
      case 'left':
        return createRuleLeftStyles(selectionOrigin, hoverOrigin, zoom, color);
    }
  }
  const getDimStyles = () => {
    switch(side) {
      case 'top':
      case 'bottom':
        return createDimTopBottomStyles(selectionOrigin, artboardFrame, zoom);
      case 'right':
      case 'left':
        return createDimRightLeftStyles(selectionOrigin, artboardFrame, zoom);
    }
  }
  const getDim = () => {
    switch(side) {
      case 'top':
        return selectionOrigin.top <= hoverOrigin.bottom
                ? selectionOrigin.top - hoverOrigin.top
                : selectionOrigin.top - hoverOrigin.bottom
      case 'right':
        return selectionOrigin.right >= hoverOrigin.left
                ? hoverOrigin.right - selectionOrigin.right
                : hoverOrigin.left - selectionOrigin.right
      case 'bottom':
        return selectionOrigin.bottom >= hoverOrigin.top
                ? hoverOrigin.bottom - selectionOrigin.bottom
                : hoverOrigin.top - selectionOrigin.bottom;
      case 'left':
        return selectionOrigin.left <= hoverOrigin.right
                ? selectionOrigin.left - hoverOrigin.left
                : selectionOrigin.left - hoverOrigin.right
    }
  }
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className={`c-selection__rule c-selection__rule--${side}`}
          style={getRuleStyles(theme.palette.primary)}>
          <LayerDim
            style={getDimStyles()}
            dim={getDim()} />
          <div
            className='c-selection__rule-leg'
            style={{background: theme.palette.primary}} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default SelectionRule;
