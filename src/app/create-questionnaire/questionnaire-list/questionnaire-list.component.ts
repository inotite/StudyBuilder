import {Component, OnInit, AfterViewInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {QuestionnaireListItem} from '../../shared/models/questionnaire-list-item.model';
import {QuestionnairesService} from '../../shared/services/questionnaires.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Questionnaire} from 'src/app/shared/models/questionnaire.model';

@Component({
   selector: 'app-questionnaire-list',
   templateUrl: './questionnaire-list.component.html',
   styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent implements OnInit, AfterViewChecked, OnDestroy {
   @Input() questionnaires: Questionnaire[];
   private unsubscribe = new Subject<void>();
   showQuestionnaires: boolean;

   constructor(private questionnairesService: QuestionnairesService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

   ngOnInit() {
      this.questionnairesService
         .getQuestionnaireListItems()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe((data: Questionnaire[]) => (this.questionnaires = data));
   }

   ngAfterViewChecked() {
      this.questionnairesService.updateCurrentQuestionnaireList(this.questionnaires);
      this.showQuestionnaires = this.questionnaires !== undefined;
      this.cdr.detectChanges();
   }

   ngOnDestroy() {
      if (this.unsubscribe !== null) {
         this.unsubscribe.unsubscribe();
      }
   }
}
