import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromNotes from './note-reducer';

export interface State {
  notes: fromNotes.State;
}

export const reducers = {
  notes: fromNotes.reducer
};

export const getNoteState = createFeatureSelector<fromNotes.State>('_notes');

export const getIds = createSelector(
  getNoteState,
  fromNotes.getIds,
);

export const getNotes = createSelector(
  getNoteState,
  fromNotes.getNotes,
);

export const getSelected = createSelector(
  getNoteState,
  fromNotes.getSelected,
);

export const getSelectedNote = createSelector(
  getSelected,
  getNotes
);

export const getAllNotes = createSelector(
  getIds,
  getNotes,
  (ids, notes) => {
    return ids.map(id => notes[id]);
  }
);
