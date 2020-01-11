import React from 'react';
import SidebarLayer from './SidebarLayer';
const Sidebar = (props) => (React.createElement("div", { className: 'c-sidebar' },
    React.createElement("div", { className: 'c-sidebar__section c-sidebar__selection' },
        React.createElement("h1", { className: 'c-sidebar__header' }, "Selection"),
        props.selection
            ? React.createElement(SidebarLayer, { layer: props.selection, images: props.images, svgs: props.svgs })
            : React.createElement("div", { className: 'c-sidebar__placeholder' },
                React.createElement("span", null, "Click layer to see properties"))),
    React.createElement("div", { className: 'c-sidebar__section c-sidebar__hover' },
        React.createElement("h1", { className: 'c-sidebar__header' }, "Hover"),
        props.hover
            ? React.createElement(SidebarLayer, { layer: props.hover, images: props.images, svgs: props.svgs })
            : React.createElement("div", { className: 'c-sidebar__placeholder' },
                React.createElement("span", null, "Mouseover layer to see properties")))));
export default Sidebar;
