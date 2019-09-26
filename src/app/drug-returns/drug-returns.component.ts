import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-drug-returns',
  templateUrl: './drug-returns.component.html',
  styleUrls: ['./drug-returns.component.scss']
})
export class DrugReturnsComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Drug Return');
  }
}
