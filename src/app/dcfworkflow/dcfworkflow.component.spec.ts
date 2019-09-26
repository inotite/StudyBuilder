import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DCFWorkflowComponent } from './dcfworkflow.component';

describe('DCFWorkflowComponent', () => {
  let component: DCFWorkflowComponent;
  let fixture: ComponentFixture<DCFWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DCFWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DCFWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
