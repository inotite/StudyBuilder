import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeHorizontalRowComponent } from './home-horizontal-row.component';
import { HomeHorizontalRowSectionComponent } from './../home-horizontal-row-section/home-horizontal-row-section.component';
import { MenuItem } from './../../shared/models/menu-item.model';
import { TestHelper } from './../../shared/helpers/test.helper';

describe('HomeHorizontalRowComponent', () => {
  let component: HomeHorizontalRowComponent;
  let fixture: ComponentFixture<HomeHorizontalRowComponent>;
  let items: MenuItem[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          HomeHorizontalRowComponent,
          HomeHorizontalRowSectionComponent
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA
        ]
      })
      .compileComponents()
      .then(() => {
        items = [
          {
            textKey: 'key 1',
            displayName: 'name 1',
            cssIcon: 'icon-1',
            isDone: true,
            url: './url1',
            isBelowBar: true
          },
          {
            textKey: 'key 2',
            displayName: 'name 2',
            cssIcon: 'icon-2',
            isDone: false,
            url: './url2',
            isBelowBar: false
          }
        ];
        fixture = TestBed.createComponent(HomeHorizontalRowComponent);
        component = fixture.componentInstance;
        component.items = items;
        component.title = 'testing component';
        fixture.detectChanges();
      });
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a div with the header-cell class',
    () => {
      const element = TestHelper.getElementByCss(fixture, 'div.header-cell');

      expect(element).toBeTruthy();
    });

  it('should create a label inside the div',
    () => {
      const label = TestHelper.getElementByCss(fixture, 'div.header-cell label') as HTMLLabelElement;

      expect(label).toBeTruthy();
    });

  it('should set the text inside the label to the upper case of the Component\'s title',
    () => {
      const label = TestHelper.getElementByCss(fixture, 'div.header-cell label') as HTMLLabelElement;

      expect(label.innerText).toEqual(component.title.toUpperCase());
    });

  it('should create a div with the bucket class',
    () => {
      const bucket = TestHelper.getElementByCss(fixture, 'div.bucket');

      expect(bucket).toBeTruthy();
    });

  it('should create one Home Horizontal Row Section if there are no items below the bar',
    () => {
      items.forEach(item => item.isBelowBar = false);
      component.ngOnInit();
      fixture.detectChanges();
      const sections = TestHelper.getAllElementsByAngular(fixture, HomeHorizontalRowSectionComponent);

      expect(sections.length).toEqual(1);
    });

  it('should create two Home Horizontal Row Sections if there are some items below the bar',
    () => {
      items.forEach((item, index) => item.isBelowBar = index % 2 === 0);
      component.ngOnInit();
      fixture.detectChanges();
      const sections = TestHelper.getAllElementsByAngular(fixture, HomeHorizontalRowSectionComponent);

      expect(sections.length).toEqual(2);
    });

  it('should create two Home Horizontal Row Sections is there are no items above the bar',
    () => {
      items.forEach(item => item.isBelowBar = true);
      component.ngOnInit();
      fixture.detectChanges();
      const sections = TestHelper.getAllElementsByAngular(fixture, HomeHorizontalRowSectionComponent);

      expect(sections.length).toEqual(2);
    });

  it('should pass the items above the bar to the first Home Horizontal Row Section',
    () => {
      const expected = items.filter(item => !item.isBelowBar);
      const topSection = TestHelper.getAllElementsByAngular(fixture, HomeHorizontalRowSectionComponent)[0]
                                   .componentInstance as HomeHorizontalRowSectionComponent;

      expect(topSection.items).toEqual(expected);
    });

  it('should set isAboveBar to true on the first Home Horizontal Row Section',
    () => {
      const topSection = TestHelper.getAllElementsByAngular(fixture, HomeHorizontalRowSectionComponent)[0]
                                   .componentInstance as HomeHorizontalRowSectionComponent;

      expect(topSection.isAboveBar).toEqual(true);
    });

  it('should pass the items below the bar to the second Home Horizontal Row Section',
    () => {
      const expected = items.filter(item => item.isBelowBar);
      const bottomSection = TestHelper.getAllElementsByAngular(fixture, HomeHorizontalRowSectionComponent)[1]
                                      .componentInstance as HomeHorizontalRowSectionComponent;

      expect(bottomSection.items).toEqual(expected);
    });

  it('should set isAboveBar to false on the second Home Horizontal Row Section',
    () => {
      const topSection = TestHelper.getAllElementsByAngular(fixture, HomeHorizontalRowSectionComponent)[1]
                                   .componentInstance as HomeHorizontalRowSectionComponent;

      expect(topSection.isAboveBar).toEqual(false);
    });
});
