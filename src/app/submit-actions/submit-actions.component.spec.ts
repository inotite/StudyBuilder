import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitActionsComponent } from './submit-actions.component';

describe('SubmitActionsComponent', () => {
  let component: SubmitActionsComponent;
  let fixture: ComponentFixture<SubmitActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
