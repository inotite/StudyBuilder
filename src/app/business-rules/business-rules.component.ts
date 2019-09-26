import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-business-rules',
  templateUrl: './business-rules.component.html',
  styleUrls: ['./business-rules.component.scss']
})
export class BusinessRulesComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Business Rules');
  }

}
