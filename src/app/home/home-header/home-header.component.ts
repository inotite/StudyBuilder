import { ConfigService } from './../../shared/services/config.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { StudyTypes } from '../../shared/models/study-types.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
   selector: 'app-home-header',
   templateUrl: './home-header.component.html',
   styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit, OnDestroy {
   backgroundObservable = new BehaviorSubject<string>('');
   yPrimeLogoUrl: string;
   studyType: number;
   studyTypeOptions = {
      placeholder: 'Select Study Type',
      selectedItem: null,
      items: Object.keys(StudyTypes)
         .filter(key => isNaN(Number.parseInt(key, 10)))
         .map(key => ({
            id: StudyTypes[key],
            name: key
         }))
   };
   private unsubscribe = new Subject<void>();

   constructor(private readonly configService: ConfigService) {}

   ngOnInit() {
      this.configService
         .getHomePageBannerPath()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(this.backgroundObservable);
      this.configService
         .getYPrimeLogoPath()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe((url: string) => {
            this.yPrimeLogoUrl = url;
         });
      this.configService
         .getStudyType()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe((type: StudyTypes) => {
            this.studyType = type as number;
            this.studyTypeOptions.selectedItem =
               this.studyType > -1 ? this.studyType.toString() : null;
         });
   }

   changedStudyType(studyType: string) {
      const typeNumber = Number.parseInt(studyType, 10);
      const cleanTypeNumber = isNaN(typeNumber) ? -1 : typeNumber;
      this.configService.setStudyType(cleanTypeNumber as StudyTypes);
   }

   ngOnDestroy() {
      this.unsubscribe.next();
      this.unsubscribe.complete();
   }
}
