import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
   selector: 'app-panel-title',
   templateUrl: './panel-title.component.html',
   styleUrls: ['./panel-title.component.scss']
})
export class PanelTitleComponent implements OnInit {
   constructor(public title: Title) {}

   ngOnInit() {}
}
