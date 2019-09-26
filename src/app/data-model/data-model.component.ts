import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.scss']
})
export class DataModelComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Data Model');
  }
}
