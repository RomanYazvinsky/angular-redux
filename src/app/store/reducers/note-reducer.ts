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
    case '[Notes] add One': {
      const newNote: Note = action.payload;
      newNote.id = state.notes.length;
      return {
        ...state,
        ids: [...state.ids, newNote.id],
        notes: [...state.notes, newNote]
      };
    }
    case '[Notes] Select': {
      const note = action.payload;
      return {
        ...state,
        selected: note
      };
    }
    case '[Notes] set all': {
      const newNotes = action.payload;
      const newIds = [];
      newNotes.forEach(function (item, i, arr) {
        newIds.push(i);
      });
      const a = {
        ...state,
        ids: [...newIds],
        notes: [...newNotes]
      };
      return a;
    }
    case '[Notes] delete': {
      const delNote = action.payload;
      state.ids.splice(state.ids.indexOf(delNote.id), 1);
      const newIds = [...state.ids];
      state.notes.splice(state.notes.indexOf(delNote), 1);
      const newNotes = [...state.notes];
      const a = {
        ...state,
        ids: [...newIds],
        notes: [...newNotes]
      };
      return a;
    }
    default: {
      return {...state};
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getNotes = (state: State) => state.notes;
export const getSelected = (state: State) => state.selected;
