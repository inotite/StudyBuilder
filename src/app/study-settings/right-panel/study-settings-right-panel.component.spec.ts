import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySettingsRightPanelComponent } from './study-settings-right-panel.component';
import { HelperTextComponent } from 'src/app/shared/components/helper-text/helper-text.component';

describe('StudySettingsRightPanelComponent', () => {
  let component: StudySettingsRightPanelComponent;
  let fixture: ComponentFixture<StudySettingsRightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudySettingsRightPanelComponent,
        HelperTextComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySettingsRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
