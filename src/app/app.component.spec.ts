import {AppComponent} from './app.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {NotesComponent} from './components/notes/notes.component';
import {SimpleNoteComponent} from './components/simple-note/simple-note.component';
import {NoteComponent} from './components/note/note.component';
import {FormsModule} from '@angular/forms';
import {reducers} from './store/reducers';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a title', () => {
    component.title = 'Hello world!';
    fixture.detectChanges();
    expect(component.title).toBe('Hello world!');
  });
});
