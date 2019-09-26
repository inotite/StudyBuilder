import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-srd',
  templateUrl: './srd.component.html',
  styleUrls: ['./srd.component.scss']
})
export class SRDComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('SRD');
  }
}
