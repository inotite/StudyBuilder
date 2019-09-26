import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dispensations',
  templateUrl: './dispensations.component.html',
  styleUrls: ['./dispensations.component.scss']
})
export class DispensationsComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Dispensations');
  }
}
