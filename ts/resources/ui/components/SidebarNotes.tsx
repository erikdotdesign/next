import React from 'react';
import IconClose from './IconClose';

interface SidebarNotesProps {
  selection: any;
  notes: any;
  setNotes: any;
  edit: boolean;
  composing: boolean;
}

const SidebarNotes = (props: SidebarNotesProps) => {
  const { selection, notes, setNotes, edit, composing } = props;
  const removeNote = (noteIndex: number) => {
    const newNotes = notes[selection.id].filter((n: any, i: number) => {
      return i !== noteIndex;
    });
    if (newNotes.length !== 0) {
      setNotes({
        ...notes,
        [selection.id]: newNotes
      });
    } else {
      let notesCopy = Object.assign({}, notes);
      delete notesCopy[selection.id];
      setNotes(notesCopy);
    }
  }
  return (
    <div className='c-sidebar__section'>
      <div className='c-sidebar__header'>
        <span>Notes</span>
      </div>
      {
        selection
        ? <div>
            {
              notes[selection.id]
              ? <ul className='c-sidebar__notes'>
                  {
                    notes[selection.id].map((note: string, index: number) => (
                      <li className='c-sidebar__note' key={index}>
                        <div className='c-sidebar__note-content'>
                          <span>
                            { note }
                          </span>
                          {
                            edit && composing
                            ? <button
                                className='c-sidebar__note-remove'
                                onClick={() => removeNote(index)}>
                                <IconClose />
                              </button>
                            : null
                          }
                        </div>
                      </li>
                    ))
                  }
                </ul>
              : <div className='c-sidebar__placeholder'>
                  <span>This layer has no notes</span>
                </div>
            }
          </div>
        : <div className='c-sidebar__placeholder'>
            <span>Click layer to see notes</span>
          </div>
      }
    </div>
  )
};

export default SidebarNotes;