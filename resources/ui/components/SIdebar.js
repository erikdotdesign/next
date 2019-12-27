import React from 'react';
class Sidebar extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-sidebar' },
            React.createElement("span", null, this.props.appState.selection.name),
            React.createElement("span", null, this.props.appState.hover.name)));
    }
}
export default Sidebar;
