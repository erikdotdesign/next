import React from 'react';
import SidebarLayer from './SidebarLayer';

interface SidebarProps {
  children?: React.ReactNode;
  appState: any;
  images: any;
  svgs: any;
}

class Sidebar extends React.Component<SidebarProps, {}> {
  render() {
    return (
      <div className='c-sidebar'>
        <div className='c-sidebar__section c-sidebar__selection'>
          <h1 className='c-sidebar__header'>Selection</h1>
          {
            this.props.appState.selection
            ? <SidebarLayer
                layer={this.props.appState.selection}
                images={this.props.images}
                svgs={this.props.svgs} />
            : <div className='c-sidebar__placeholder'>
                <span>Click layer to see properties</span>
              </div>
          }
        </div>
        <div className='c-sidebar__section c-sidebar__hover'>
          <h1 className='c-sidebar__header'>Hover</h1>
          {
            this.props.appState.hover
            ? <SidebarLayer
                layer={this.props.appState.hover}
                images={this.props.images}
                svgs={this.props.svgs} />
            : <div className='c-sidebar__placeholder'>
                <span>Mouseover layer to see properties</span>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default Sidebar;