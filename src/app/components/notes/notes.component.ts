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
    try {
      this.noteService.notes.subscribe(value => this.notes = value);
    } catch (e) {
      alert('Server is unavailable');
    }
  }

  onSelect(note: Note) {
    this.selected = note;
  }

  createNew() {
    this.selected = new Note();
    this.creation = true;
  }

  async add(note: Note) {
    if (!note) {
      throw new Error('Argument is null! Nothing to addOrEdit');
    }
    await this.noteService.addOrEdit(note);
    this.creation = false;
  }

  delete(note: Note) {
    if (!note) {
      throw new Error('Argument is null! Nothing to delete');
    }
    this.noteService.delete(note);
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
