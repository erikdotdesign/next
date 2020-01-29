import React from 'react';
import ThemeContext from './ThemeContext';

interface SidebarPlaceholderProps {
  text: string;
}

const SidebarPlaceholder = (props: SidebarPlaceholderProps) => {
  const { text } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className='c-sidebar__placeholder'>
          <span style={{color: theme.text.lighter}}>
            {text}
          </span>
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarPlaceholder;