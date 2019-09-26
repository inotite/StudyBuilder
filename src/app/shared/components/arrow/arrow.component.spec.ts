import { TestHelper } from './../../helpers/test.helper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowComponent } from './arrow.component';
import { ArrowColors } from '../../models/arrow-colors.model';
import { ArrowDirections } from '../../models/arrow-directions.model';

describe('HomeArrowComponent', () => {
  let component: ArrowComponent;
  let fixture: ComponentFixture<ArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowComponent);
    component = fixture.componentInstance;
    component.settings = {
      color: ArrowColors.Pink,
      direction: ArrowDirections.Up
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an i element for the arrow',
    () => {
      component.settings = {
        color: ArrowColors.Pink,
        direction: ArrowDirections.Right
      };
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i');

      expect(element).toBeTruthy();
    });

  it('should assign the pink CSS class when the color is Pink',
    () => {
      component.settings = {
        color: ArrowColors.Pink,
        direction: ArrowDirections.Up
      };
      component.ngOnInit();
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i') as HTMLElement;

      expect(element.className).toContain('pink');
    });

  it('should assign the left arrow Font Awesome class when the direction is left',
    () => {
      component.settings = {
        color: ArrowColors.Pink,
        direction: ArrowDirections.Left
      };
      component.ngOnInit();
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i') as HTMLElement;

      expect(element.className).toContain('fa-long-arrow-alt-left');
    });

  it('should assign the right arrow Font Awesome class when the direction is right',
    () => {
      component.settings = {
        color: ArrowColors.Pink,
        direction: ArrowDirections.Right
      };
      component.ngOnInit();
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i') as HTMLElement;

      expect(element.className).toContain('fa-long-arrow-alt-right');
    });

  it('should assign the up arrow Font Awesome class when the direction is up',
    () => {
      component.settings = {
        color: ArrowColors.Pink,
        direction: ArrowDirections.Up
      };
      component.ngOnInit();
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i') as HTMLElement;

      expect(element.className).toContain('fa-long-arrow-alt-up');
    });

  it('should assign the down arrow Font Awesome class when the direction is down',
    () => {
      component.settings = {
        color: ArrowColors.Pink,
        direction: ArrowDirections.Down
      };
      component.ngOnInit();
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i') as HTMLElement;

      expect(element.className).toContain('fa-long-arrow-alt-down');
    });
});
