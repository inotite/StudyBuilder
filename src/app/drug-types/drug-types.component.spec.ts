import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugTypesComponent } from './drug-types.component';

describe('DrugTypesComponent', () => {
  let component: DrugTypesComponent;
  let fixture: ComponentFixture<DrugTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
