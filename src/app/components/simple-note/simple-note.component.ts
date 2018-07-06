import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../models/Note';

@Component({
  selector: 'app-simple-note',
  templateUrl: './simple-note.component.html',
  styleUrls: ['./simple-note.component.css']
})
export class SimpleNoteComponent implements OnInit {

  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
