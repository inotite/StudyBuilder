import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   public appTitle = 'YPrime StudyBuilder';

   constructor(private title: Title) {}

   ngOnInit() {
      this.title.setTitle(this.appTitle);
   }
}
