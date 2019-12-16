import React from 'react';
class Sidebar extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-sidebar' }, this.props.children));
    }
}
export default Sidebar;
