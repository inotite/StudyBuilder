import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-drug-types',
  templateUrl: './drug-types.component.html',
  styleUrls: ['./drug-types.component.scss']
})
export class DrugTypesComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Drug Types');
  }
}
