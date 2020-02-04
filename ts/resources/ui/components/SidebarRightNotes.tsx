import React from 'react';
import SidebarRightNote from './SidebarRightNote';
import SidebarHeader from './SidebarHeader';
import SidebarPlaceholder from './SidebarPlaceholder';
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
      <SidebarHeader text='Notes' />
      {
        selection
        ? <div>
            {
              selectionNotes
              ? <ul className='c-sidebar-right__notes'>
                  {
                    selectionNotes.notes.map((note: string, index: number) => (
                      <SidebarRightNote
                        key={index}
                        note={note}
                        index={index}
                        composing={composing}
                        onClick={() => removeNote(index)} />
                    ))
                  }
                </ul>
              : <SidebarPlaceholder text='This layer has no notes' />
            }
          </div>
        : <SidebarPlaceholder text='Click layer to see notes' />
      }
    </div>
  )
};

export default SidebarRightNotes;