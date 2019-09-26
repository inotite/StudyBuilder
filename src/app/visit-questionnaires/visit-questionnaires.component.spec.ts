import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitQuestionnairesComponent } from './visit-questionnaires.component';

describe('VisitQuestionnairesComponent', () => {
  let component: VisitQuestionnairesComponent;
  let fixture: ComponentFixture<VisitQuestionnairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitQuestionnairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
