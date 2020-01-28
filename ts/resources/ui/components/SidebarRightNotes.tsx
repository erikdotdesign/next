import React from 'react';
import IconClose from './IconClose';
import { getLayerNotes } from '../utils';

interface SidebarRightNotesProps {
  selection: srm.AppLayer | null;
  notes: srm.Note[];
  composing: boolean;
  setNotes(notes: srm.Note[]): void;
}

const SidebarRightNotes = (props: SidebarRightNotesProps) => {
  const { selection, notes, setNotes, composing } = props;
  const selectionNotes = selection ? getLayerNotes(selection.id, notes) : null;
  const removeNote = (noteIndex: number) => {
    if (selection) {
      if ((selectionNotes as srm.Note).notes.length > 1) {
        let newNotes = notes.map((layerNotes: any) => {
          if (layerNotes.id === selection.id) {
            layerNotes.notes.splice(noteIndex, 1);
          }
          return layerNotes;
        });
        setNotes(newNotes);
      } else {
        let notesCopy = [...notes];
        let selectionIndex = notes.findIndex((layer: srm.Note) => {
          return layer.id === selection.id;
        });
        notesCopy.splice(selectionIndex, 1);
        setNotes(notesCopy);
      }
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
              selectionNotes
              ? <ul className='c-sidebar__notes'>
                  {
                    selectionNotes.notes.map((note: string, index: number) => (
                      <li className='c-sidebar__note' key={index}>
                        <div className='c-sidebar__note-content'>
                          <span>
                            { note }
                          </span>
                          {
                            composing
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

export default SidebarRightNotes;