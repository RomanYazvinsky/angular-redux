import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NotesComponent} from './components/notes/notes.component';
import {FormsModule} from '@angular/forms';
import {SimpleNoteComponent} from './components/simple-note/simple-note.component';
import {NoteComponent} from './components/note/note.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SimpleNoteComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
