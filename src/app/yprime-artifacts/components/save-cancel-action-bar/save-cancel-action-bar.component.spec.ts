import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCancelActionBarComponent } from './save-cancel-action-bar.component';

describe('SaveCancelActionBarComponent', () => {
  let component: SaveCancelActionBarComponent;
  let fixture: ComponentFixture<SaveCancelActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCancelActionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCancelActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
