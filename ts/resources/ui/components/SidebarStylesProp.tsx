import React from 'react';
// @ts-ignore
import hyphenate from 'hyphenate-style-name';

interface SidebarStylesPropProps {
  prop: string;
}

const SidebarStylesProp = (props: SidebarStylesPropProps) => (
  <div className='c-sidebar-styles__prop'>
    {hyphenate(props.prop)}
  </div>
);

export default SidebarStylesProp;