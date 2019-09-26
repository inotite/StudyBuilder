import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLayoutsComponent } from './report-layouts.component';

describe('ReportLayoutsComponent', () => {
  let component: ReportLayoutsComponent;
  let fixture: ComponentFixture<ReportLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
