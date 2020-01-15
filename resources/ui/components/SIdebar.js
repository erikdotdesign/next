import React from 'react';
import SidebarLayer from './SidebarLayer';
const Sidebar = (props) => {
    const { selection, images, svgs, notes, setNotes, edit, composing } = props;
    const removeNote = (noteIndex) => {
        const newNotes = notes[selection.id].filter((n, i) => {
            return i !== noteIndex;
        });
        if (newNotes.length !== 0) {
            setNotes(Object.assign(Object.assign({}, notes), { [selection.id]: newNotes }));
        }
        else {
            let notesCopy = Object.assign({}, notes);
            delete notesCopy[selection.id];
            setNotes(notesCopy);
        }
    };
    const selectionNotes = notes[selection.id];
    return (React.createElement("div", { className: 'c-sidebar' },
        React.createElement("div", { className: 'c-sidebar__section' },
            React.createElement("h1", { className: 'c-sidebar__header' }, "Styles"),
            selection
                ? React.createElement(SidebarLayer, { layer: selection, images: images, svgs: svgs })
                : React.createElement("div", { className: 'c-sidebar__placeholder' },
                    React.createElement("span", null, "Click layer to see properties"))),
        selectionNotes
            ? React.createElement("div", { className: 'c-sidebar__section' },
                React.createElement("h1", { className: 'c-sidebar__header' }, "Notes"),
                React.createElement("ul", { className: 'c-sidebar__notes' }, selectionNotes.map((note, index) => (React.createElement("li", { className: 'c-sidebar__note', key: index },
                    React.createElement("div", { className: 'c-sidebar__note-content' },
                        React.createElement("span", null, note),
                        edit && composing
                            ? React.createElement("button", { className: 'c-sidebar__note-remove', onClick: () => removeNote(index) },
                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                    React.createElement("path", { fill: "#fff", d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }),
                                    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })))
                            : null))))))
            : null));
};
export default Sidebar;
// interface SidebarProps {
//   selection: any;
//   hover: any;
//   images: any;
//   svgs: any;
//   notes: any;
// }
// const Sidebar = (props: SidebarProps) => (
//   <div className='c-sidebar'>
//     <div className='c-sidebar__section c-sidebar__selection'>
//       <h1 className='c-sidebar__header'>Selection</h1>
//       {
//         props.selection
//         ? <SidebarLayer
//             layer={props.selection}
//             images={props.images}
//             svgs={props.svgs} />
//         : <div className='c-sidebar__placeholder'>
//             <span>Click layer to see properties</span>
//           </div>
//       }
//     </div>
//     <div className='c-sidebar__section c-sidebar__hover'>
//       <h1 className='c-sidebar__header'>Hover</h1>
//       {
//         props.hover
//         ? <SidebarLayer
//             layer={props.hover}
//             images={props.images}
//             svgs={props.svgs} />
//         : <div className='c-sidebar__placeholder'>
//             <span>Mouseover layer to see properties</span>
//           </div>
//       }
//     </div>
//   </div>
// );
