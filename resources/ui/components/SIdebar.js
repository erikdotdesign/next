import React from 'react';
import SidebarLayer from './SidebarLayer';
class Sidebar extends React.Component {
    render() {
        return (React.createElement("div", { className: 'c-sidebar' },
            React.createElement("div", { className: 'c-sidebar__section c-sidebar__selection' },
                React.createElement("h1", { className: 'c-sidebar__header' }, "Selection"),
                this.props.appState.selection
                    ? React.createElement(SidebarLayer, { layer: this.props.appState.selection, images: this.props.images })
                    : React.createElement("div", { className: 'c-sidebar__placeholder' },
                        React.createElement("span", null, "Click layer to see properties"))),
            React.createElement("div", { className: 'c-sidebar__section c-sidebar__hover' },
                React.createElement("h1", { className: 'c-sidebar__header' }, "Hover"),
                this.props.appState.hover
                    ? React.createElement(SidebarLayer, { layer: this.props.appState.hover, images: this.props.images })
                    : React.createElement("div", { className: 'c-sidebar__placeholder' },
                        React.createElement("span", null, "Mouseover layer to see properties")))));
    }
}
export default Sidebar;
