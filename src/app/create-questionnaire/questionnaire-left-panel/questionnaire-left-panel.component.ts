import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'app-questionnaire-left-panel',
   templateUrl: './questionnaire-left-panel.component.html',
   styleUrls: ['./questionnaire-left-panel.component.scss']
})
export class QuestionnaireLeftPanelComponent implements OnInit {
   disable: boolean;
   constructor() {}

   ngOnInit() {}

   disablePanel(disable: boolean) {
      this.disable = disable;
   }
}
