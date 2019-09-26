import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StudyTypes } from 'src/app/shared/models/study-types.model';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-study-settings-left-panel',
  templateUrl: './study-settings-left-panel.component.html',
  styleUrls: ['./study-settings-left-panel.component.scss']
})
export class StudySettingsLeftPanelComponent implements OnInit {

  @Output() categoryLinkSelected = new EventEmitter<string>();

  studyType: StudyTypes;

  private unsubscribe = new Subject<void>();
  private categoryMatrix = [
    { category: 'StudyWide', studyType: StudyTypes.Unified },
    { category: 'eCOA',      studyType: StudyTypes.Unified },
    { category: 'IRT',       studyType: StudyTypes.Unified },
    { category: 'StudyWide', studyType: StudyTypes.eCOA },
    { category: 'eCOA',      studyType: StudyTypes.eCOA },
    { category: 'StudyWide', studyType: StudyTypes.IRT },
    { category: 'IRT',       studyType: StudyTypes.IRT },
  ];

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getStudyType()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((studyType: StudyTypes) => {
        this.studyType = studyType;
      });
  }

  shouldDisplayCategory(category: string): boolean {
    let shouldDisplay = false;

    const categoryItem = this.categoryMatrix.find((item) => {
      if (item.studyType === this.studyType &&
          item.category === category) {
            return true;
      }
    });

    if (categoryItem !== undefined) {
      shouldDisplay = true;
    }

    return shouldDisplay;
  }

  selectCategoryLink(categoryLink: string): void {
    this.categoryLinkSelected.emit(categoryLink);
  }
}
