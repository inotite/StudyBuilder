import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseLevelsComponent } from './dose-levels.component';

describe('DoseLevelsComponent', () => {
  let component: DoseLevelsComponent;
  let fixture: ComponentFixture<DoseLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoseLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoseLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
