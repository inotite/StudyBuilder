import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensationsComponent } from './dispensations.component';

describe('DispensationsComponent', () => {
  let component: DispensationsComponent;
  let fixture: ComponentFixture<DispensationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
