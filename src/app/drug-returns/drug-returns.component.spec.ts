import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugReturnsComponent } from './drug-returns.component';

describe('DrugReturnsComponent', () => {
  let component: DrugReturnsComponent;
  let fixture: ComponentFixture<DrugReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
