import {NotesComponent} from './notes.component';
import {FormsModule} from '@angular/forms';
import {SimpleNoteComponent} from '../simple-note/simple-note.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {reducers} from '../../store/reducers';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {NoteComponent} from '../note/note.component';
import {HttpClientModule} from '@angular/common/http';
import {NoteService} from '../../services/note.service';
import {NoteServiceFake} from './testService/note.fake.service';
import {Note} from '../../models';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
      providers: [{provide: NoteService, useClass: NoteServiceFake}]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain div, ul and button elements on init', async(() => {
      fixture.detectChanges();
      expect(element.getElementsByTagName('*').length).toBe(3);
    }
  ));
  it('should not show any note when service does not contain them on init', async(() => {
      fixture.detectChanges();
      expect(element.getElementsByTagName('app-simple-note').length).toBe(0);
    }
  ));
  it('should show a single note added to service', async(() => {
      component.selected = new Note();
      component.add(component.selected);
      fixture.detectChanges();
      expect(element.getElementsByTagName('app-simple-note').length).toBe(1);
    }
  ));
  it('should show a title of note added to service', async(() => {
      component.selected = new Note();
      component.selected.title = 'lalala';
      component.add(component.selected);
      fixture.detectChanges();
      expect(element.getElementsByTagName('app-simple-note')[0].firstElementChild.textContent).toContain('lalala');
    }
  ));
  it('should not show any deleted element', async(() => {
      component.selected = new Note();
      component.add(component.selected);
      fixture.detectChanges();
      component.delete(component.selected);
      fixture.detectChanges();
      expect(element.getElementsByTagName('app-simple-note').length).toBe(0);
    }
  ));
  it('should show app-note form after setting creation flag', async(() => {
      component.createNew();
      fixture.detectChanges();
      expect(element.getElementsByTagName('app-note').length).toBe(1);
    }
  ));
  it('should set the first element to be selected after removing', async(() => {
      component.createNew();
      const first = component.selected;
      first.title = 'first';
      component.add(component.selected);
      component.createNew();
      const second = component.selected;
      second.title = 'second';
      component.add(component.selected);
      component.createNew();
      component.add(component.selected);
      fixture.detectChanges();
      component.selected = first;
      component.delete(component.selected);
      fixture.detectChanges();
      expect(component.selected).toBe(second);
    }
  ));
  it('should throw an exception when removing null', async(() => {
      expect(() => {
        component.delete(null);
      }).toThrowError();
    }
  ));
});
