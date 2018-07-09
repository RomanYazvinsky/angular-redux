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
      return add(action.payload, state);
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
      return remove(action.payload, state);
    }
    case noteAction.ADD_OR_EDIT: {
      const newNote: Note = action.payload;
      const notes = state.notes;
      if (notes.includes(newNote)) {
        remove(newNote, state);
      }
      return add(newNote, state);
    }
    default: {
      return {...state};
    }
  }
}

function add(note: Note, state: State) {
  note.id = state.notes.length;
  return {
    ...state,
    ids: [...state.ids, note.id],
    notes: [...state.notes, note]
  };
}

function remove(note: Note, state: State) {
  state.ids.splice(state.ids.indexOf(note.id), 1);
  const newIds = [...state.ids];
  state.notes.splice(state.notes.indexOf(note), 1);
  const newNotes = [...state.notes];
  return {
    ...state,
    ids: [...newIds],
    notes: [...newNotes]
  };
}
export const getIds = (state: State) => state.ids;
export const getNotes = (state: State) => state.notes;
export const getSelected = (state: State) => state.selected;
