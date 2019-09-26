import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-dose-levels',
  templateUrl: './dose-levels.component.html',
  styleUrls: ['./dose-levels.component.scss']
})
export class DoseLevelsComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Dose Levels');
  }
}
