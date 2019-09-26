import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-visit-questionnaires',
  templateUrl: './visit-questionnaires.component.html',
  styleUrls: ['./visit-questionnaires.component.scss']
})
export class VisitQuestionnairesComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Visit Questionnaires');
  }
}
