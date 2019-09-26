import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dcfworkflow',
  templateUrl: './dcfworkflow.component.html',
  styleUrls: ['./dcfworkflow.component.scss']
})
export class DCFWorkflowComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('DCF Workflow');
  }

}
