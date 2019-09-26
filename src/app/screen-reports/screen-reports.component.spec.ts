import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenReportsComponent } from './screen-reports.component';

describe('ScreenReportsComponent', () => {
  let component: ScreenReportsComponent;
  let fixture: ComponentFixture<ScreenReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
