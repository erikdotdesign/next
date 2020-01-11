import React from 'react';
import SidebarLayer from './SidebarLayer';

interface SidebarProps {
  selection: any;
  hover: any;
  images: any;
  svgs: any;
}

const Sidebar = (props: SidebarProps) => (
  <div className='c-sidebar'>
    <div className='c-sidebar__section c-sidebar__selection'>
      <h1 className='c-sidebar__header'>Selection</h1>
      {
        props.selection
        ? <SidebarLayer
            layer={props.selection}
            images={props.images}
            svgs={props.svgs} />
        : <div className='c-sidebar__placeholder'>
            <span>Click layer to see properties</span>
          </div>
      }
    </div>
    <div className='c-sidebar__section c-sidebar__hover'>
      <h1 className='c-sidebar__header'>Hover</h1>
      {
        props.hover
        ? <SidebarLayer
            layer={props.hover}
            images={props.images}
            svgs={props.svgs} />
        : <div className='c-sidebar__placeholder'>
            <span>Mouseover layer to see properties</span>
          </div>
      }
    </div>
  </div>
);

export default Sidebar;