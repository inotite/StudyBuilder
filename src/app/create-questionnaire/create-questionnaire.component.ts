import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
   selector: 'app-create-questionnaire',
   templateUrl: './create-questionnaire.component.html',
   styleUrls: ['./create-questionnaire.component.scss']
})
export class CreateQuestionnaireComponent implements OnInit {
   constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('QUESTIONNAIRE');
  }
}
