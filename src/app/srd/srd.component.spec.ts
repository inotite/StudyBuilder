import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SRDComponent } from './srd.component';

describe('SRDComponent', () => {
  let component: SRDComponent;
  let fixture: ComponentFixture<SRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SRDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
