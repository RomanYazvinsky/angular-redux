import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as fromRoot from '../store/reducers';
import {Store} from '@ngrx/store';
import {Note} from '../models';
import * as noteActions from '../store/actions/notes';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  get notes(): Observable<Note[]> {
    this.updateNotes();
    return this._notes;
  }

  set notes(value: Observable<Note[]>) {
    this._notes = value;
  }

  private _notes: Observable<Note[]>;

  isConnected: boolean;

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    this.notes = store.select(state => state.notes.notes);
  }

  private updateNotes() {
    this.isConnected = true;
    try {
      this.http.get<Note[]>('http://localhost:8080/notes', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }).pipe(catchError(err => {
          this.isConnected = false;
          console.log('server lalala');
          return throwError(err);
        }
      )).subscribe(value => {
        this.store.dispatch(new noteActions.Set(value));
      });
    } catch (e) {
      throw e;
    }
  }

  public addOrEdit(note: Note) {
    this.http.post('http://localhost:8080/note', note, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }).subscribe();
    this.updateNotes();
  }

  public delete(note: Note) {
    this.http.post('http://localhost:8080/note/delete', note, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }).subscribe();
    this.store.dispatch(new noteActions.Delete(note));
  }
}
