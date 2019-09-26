import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireRightPanelComponent } from './questionnaire-right-panel.component';

describe('QuestionnaireRightPanelComponent', () => {
  let component: QuestionnaireRightPanelComponent;
  let fixture: ComponentFixture<QuestionnaireRightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireRightPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
