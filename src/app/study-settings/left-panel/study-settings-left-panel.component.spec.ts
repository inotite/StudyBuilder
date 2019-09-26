import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySettingsLeftPanelComponent } from './study-settings-left-panel.component';
import { ConfigService } from 'src/app/shared/services/config.service';
import { of } from 'rxjs';
import { StudyTypes } from 'src/app/shared/models/study-types.model';

describe('StudySettingsLeftPanelComponent', () => {
  let component: StudySettingsLeftPanelComponent;
  let fixture: ComponentFixture<StudySettingsLeftPanelComponent>;
  let configService: jasmine.SpyObj<ConfigService>;

  const configServiceSpy = jasmine.createSpyObj('ConfigService', [
    'getStudyType'
 ]);
 configServiceSpy.getStudyType.and.returnValue(of(StudyTypes.Unified));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySettingsLeftPanelComponent ],
      providers: [{ provide: ConfigService, useValue: configServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySettingsLeftPanelComponent);
    component = fixture.componentInstance;
    configService = TestBed.get(ConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
