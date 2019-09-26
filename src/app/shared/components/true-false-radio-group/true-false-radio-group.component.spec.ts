import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseRadioGroupComponent } from './true-false-radio-group.component';
import {MatRadioModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TrueFalseRadioGroupComponent', () => {
  let component: TrueFalseRadioGroupComponent;
  let fixture: ComponentFixture<TrueFalseRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrueFalseRadioGroupComponent ],
       imports: [MatRadioModule],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueFalseRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
