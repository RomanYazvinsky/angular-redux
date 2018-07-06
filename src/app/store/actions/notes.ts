import {Action} from '@ngrx/store';
import {Note} from '../../models';

export const SELECT = '[Notes] Select';
export const ADD_ONE = '[Notes] add One';
export const SET = '[Notes] set all';

export const DELETE = '[Notes] delete';

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: Note) {
  }
}

export class AddOne implements Action {
  readonly type = ADD_ONE;

  constructor(public payload: Note) {
  }
}

export class Set implements Action {
  readonly type = SET;

  constructor(public payload: Note[]) {
  }
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: Note) {
  }
}

export type Action = AddOne | Select | Set | Delete;
