import React from 'react';
import SidebarStyles from './SidebarStyles';
import SidebarNotes from './SidebarNotes';
const Sidebar = (props) => {
    const { selection, images, svgs, notes, setNotes, edit, composing } = props;
    return (React.createElement("div", { className: 'c-sidebar' },
        React.createElement(SidebarStyles, { selection: selection, images: images, svgs: svgs }),
        React.createElement(SidebarNotes, { selection: selection, notes: notes, setNotes: setNotes, edit: edit, composing: composing })));
};
export default Sidebar;
