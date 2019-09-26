import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-screen-reports',
  templateUrl: './screen-reports.component.html',
  styleUrls: ['./screen-reports.component.scss']
})
export class ScreenReportsComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Screen Reports');
  }

}
