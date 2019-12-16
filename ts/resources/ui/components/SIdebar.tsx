import React from 'react';

interface SidebarProps {
  children?: React.ReactNode;
}

class Sidebar extends React.Component<SidebarProps, {}> {
  render() {
    return (
      <div className='c-sidebar'>
        {this.props.children}
      </div>
    );
  }
}

export default Sidebar;
