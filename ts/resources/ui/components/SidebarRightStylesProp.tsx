import React from 'react';
// @ts-ignore
import hyphenate from 'hyphenate-style-name';

interface SidebarRightStylesPropProps {
  prop: string;
}

const SidebarRightStylesProp = (props: SidebarRightStylesPropProps) => (
  <div className='c-sidebar-styles__prop'>
    {hyphenate(props.prop)}
  </div>
);

export default SidebarRightStylesProp;