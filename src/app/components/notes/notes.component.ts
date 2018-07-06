import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {Note} from '../../models';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  selected: Note;
  creation = false;

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.notes.subscribe(value => this.notes = value);
  }

  onSelect(note: Note) {
    this.selected = note;
  }

  createNew() {
    this.selected = new Note();
    this.creation = true;
  }

  add() {
    this.noteService.add(this.selected);
    this.creation = false;
  }

  delete() {
    this.noteService.delete(this.selected);
    if (this.notes.length === 0) {
      this.creation = true;
      this.createNew();
    } else {
      this.selected = this.notes[0];
    }
  }

  cancel() {
    this.selected = this.notes[0];
    this.creation = false;
  }
}
