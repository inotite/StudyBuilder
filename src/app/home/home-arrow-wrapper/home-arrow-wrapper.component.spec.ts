import { ArrowDirections } from './../../shared/models/arrow-directions.model';
import { ArrowColors } from './../../shared/models/arrow-colors.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowComponent } from './../../shared/components/arrow/arrow.component';
import { HomeArrowWrapperComponent } from './home-arrow-wrapper.component';
import { TestHelper } from './../../shared/helpers/test.helper';

describe('HomeArrowWrapperComponent', () => {
  let component: HomeArrowWrapperComponent;
  let fixture: ComponentFixture<HomeArrowWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeArrowWrapperComponent,
        ArrowComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeArrowWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a div with the home-arrow-wrapper class',
    () => {
      const element = TestHelper.getElementByCss(fixture, 'div.arrow-wrapper') as HTMLDivElement;

      expect(element).toBeTruthy();
    });

  it('should include an Arrow Component',
    () => {
      const arrow = TestHelper.getElementByAngular(fixture, ArrowComponent);

      expect(arrow).toBeTruthy();
    });

  it('will set the arrow\'s color to Pink',
    () => {
      expect(component.settings.color).toEqual(ArrowColors.Pink);
    });

  it('will set the arrow\'s direction to Right',
    () => {
      expect(component.settings.direction).toEqual(ArrowDirections.Right);
    });
});
