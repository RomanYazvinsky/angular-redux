import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as fromRoot from '../../../store/reducers';
import {Store} from '@ngrx/store';
import {Note} from '../../../models';
import {Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceFake {
  get notes(): Observable<Note[]> {
    return this._notes;
  }

  set notes(value: Observable<Note[]>) {
    this._notes = value;
  }

  private _notes: Observable<Note[]>;
  private notess: Note[];
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    this.notess = [];
    this._notes = of(this.notess);
  }

  public addOrEdit(note: Note) {
    this.notess.push(note);
  }

  public delete(note: Note) {
  this.notess.splice(this.notess.indexOf(note), 1);
  }
}
