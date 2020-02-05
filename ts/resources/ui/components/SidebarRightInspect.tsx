import React from 'react';
import ThemeContext from './ThemeContext';
import { getCSSUrl } from '../utils';

interface SidebarRightInspectProps {
  hovering: boolean;
  value: string;
  prop: string;
}

const SidebarRightInspect = (props: SidebarRightInspectProps) => {
  return (
    props.hovering && String(props.value).startsWith('url')
    ? <ThemeContext.Consumer>
        {(theme) => (
          <div
          className='c-sidebar-right__inspect'
          style={{
            backgroundImage: getCSSUrl(props.prop, props.value),
            backgroundColor: theme.background.z2,
            boxShadow: `0px 0px 0px 1px ${theme.background.z5} inset`
          }} />
        )}
      </ThemeContext.Consumer>
    : null
  );
}

export default SidebarRightInspect;