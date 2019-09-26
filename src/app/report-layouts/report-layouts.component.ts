import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-report-layouts',
  templateUrl: './report-layouts.component.html',
  styleUrls: ['./report-layouts.component.scss']
})
export class ReportLayoutsComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Reports');
  }

}
