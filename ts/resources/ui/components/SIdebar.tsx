import React from 'react';

interface SidebarProps {
  children?: React.ReactNode;
  appState: any;
}

class Sidebar extends React.Component<SidebarProps, {}> {
  render() {
    return (
      <div className='c-sidebar'>
        <span>{this.props.appState.selection.name}</span>
        <span>{this.props.appState.hover.name}</span>
      </div>
    );
  }
}

export default Sidebar;
