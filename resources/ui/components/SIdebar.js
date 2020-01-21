import React from 'react';
import SidebarStyles from './SidebarStyles';
const SidebarRight = (props) => {
    const { selection, images, svgs, notes, setNotes, edit, composing } = props;
    return (React.createElement("div", { className: 'c-sidebar c-sidebar--right' },
        React.createElement(SidebarStyles, { selection: selection, images: images, svgs: svgs })));
};
export default SidebarRight;
