import React from 'react';
import ThemeContext from './ThemeContext';

interface SidebarLeftLayerNameProps {
  name: string;
  style?: any;
}

const SidebarLeftLayerName = (props: SidebarLeftLayerNameProps) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <span className='c-sidebar-left-layer__name'>
          <span style={{
            color: theme.text.base,
            ...props.style
          }}>
            {props.name}
          </span>
        </span>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarLeftLayerName;