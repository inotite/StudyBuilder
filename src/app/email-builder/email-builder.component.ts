import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-builder',
  templateUrl: './email-builder.component.html',
  styleUrls: ['./email-builder.component.scss']
})
export class EmailBuilderComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Email Builder');
  }
}
