import React from 'react';
import ThemeContext from './ThemeContext';
// @ts-ignore
import hyphenate from 'hyphenate-style-name';

interface SidebarRightStylesPropProps {
  prop: string;
}

const SidebarRightStylesProp = (props: SidebarRightStylesPropProps) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <div
        className='c-sidebar-right__style-prop'
        style={{color: theme.text.lighter}}>
        {hyphenate(props.prop)}
      </div>
    )}
  </ThemeContext.Consumer>
);

export default SidebarRightStylesProp;