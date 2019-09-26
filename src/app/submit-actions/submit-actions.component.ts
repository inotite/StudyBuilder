import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-submit-actions',
  templateUrl: './submit-actions.component.html',
  styleUrls: ['./submit-actions.component.scss']
})
export class SubmitActionsComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Submit Actions');
  }
}
