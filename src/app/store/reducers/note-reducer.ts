import * as noteAction from '../actions/notes';
import {Note} from '../../models';

export interface State {
  ids: number[];
  notes: Note[];
  selected: Note;
}

export const initialState: State = {
  ids: [],
  notes: [],
  selected: null
};

export function reducer(state = initialState, action: noteAction.Action) {
  switch (action.type) {
    case noteAction.ADD_ONE: {
      const newNote: Note = action.payload;
      newNote.id = state.notes.length;
      return {
        ...state,
        ids: [...state.ids, newNote.id],
        notes: [...state.notes, newNote]
      };
    }
    case noteAction.SELECT: {
      const note = action.payload;
      return {
        ...state,
        selected: note
      };
    }
    case noteAction.SET: {
      const newNotes = action.payload;
      const newIds = [];
      newNotes.forEach(function (item, i) {
        newIds.push(i);
      });
      return {
        ...state,
        ids: [...newIds],
        notes: [...newNotes]
      };
    }
    case noteAction.DELETE: {
      const delNote = action.payload;
      state.ids.splice(state.ids.indexOf(delNote.id), 1);
      const newIds = [...state.ids];
      state.notes.splice(state.notes.indexOf(delNote), 1);
      const newNotes = [...state.notes];
      return {
        ...state,
        ids: [...newIds],
        notes: [...newNotes]
      };
    }
    default: {
      return {...state};
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getNotes = (state: State) => state.notes;
export const getSelected = (state: State) => state.selected;
