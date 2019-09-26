import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ControlValueAccessor} from '@angular/forms';
import {QuestionnairesService} from '../../shared/services/questionnaires.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
   selector: 'app-add-questionnaire',
   templateUrl: './add-questionnaire.component.html',
   styleUrls: ['./add-questionnaire.component.scss']
})
export class AddQuestionnaireComponent implements OnInit, OnDestroy, ControlValueAccessor {
   @Output() disable = new EventEmitter<boolean>();
   public isDisabled: boolean;
   private subscription = new Subject<any>();
   constructor(private router: Router, private route: ActivatedRoute, private questionnairesService: QuestionnairesService) {}

   ngOnInit() {
      this.questionnairesService.cancelQuestionnaireSubscription()
         .pipe(takeUntil(this.subscription))
         .subscribe(() => {
            this.isDisabled = false;
         });
   }

   onAddQuestionnaire = function() {
      this.setDisabledState(true);
      this.router.navigate(['questionnaire-form'], {relativeTo: this.route});
   };

   registerOnChange(fn: any): void {}

   registerOnTouched(fn: any): void {}

   setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
      this.disable.emit(this.isDisabled);
   }

   writeValue(obj: boolean): void {}

   ngOnDestroy(): void {
      this.subscription.next();
      this.subscription.complete();
   }
}
