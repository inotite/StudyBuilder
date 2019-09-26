import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeArrowWrapperComponent } from './../home-arrow-wrapper/home-arrow-wrapper.component';
import { HomeHorizontalRowSectionComponent } from './home-horizontal-row-section.component';
import { HomeIconComponent } from './../home-icon/home-icon.component';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { TestHelper } from './../../shared/helpers/test.helper';

describe('HomeHorizontalRowSectionComponent', () => {
   let component: HomeHorizontalRowSectionComponent;
   let fixture: ComponentFixture<HomeHorizontalRowSectionComponent>;
   let items: MenuItem[];

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [
            HomeHorizontalRowSectionComponent,
            HomeArrowWrapperComponent,
            HomeIconComponent
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
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

            fixture = TestBed.createComponent(
               HomeHorizontalRowSectionComponent
            );
            component = fixture.componentInstance;
            component.isAboveBar = false;
            component.items = items;
            fixture.detectChanges();
         });
   }));

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should add a div with the row class', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'div.row'
      ) as HTMLDivElement;

      expect(element).toBeTruthy();
   });

   it('should not add the second-row class to the div if the Component\'s isAboveBar property is true', () => {
      component.isAboveBar = true;
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(
         fixture,
         'div.row.second-row'
      ) as HTMLDivElement;

      expect(element).toBeNull();
   });

   it('should add the second-row class to the div if the Component\'s isAboveBar property is false', () => {
      component.isAboveBar = false;
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'div.row.second-row');

      expect(element).toBeTruthy();
   });

   it('should only add one col-md-12 div within the row div', () => {
      const elements = TestHelper.getAllElementsByCss(
         fixture,
         'div.row div.col-md-12'
      );

      expect(elements.length).toEqual(1);
   });

   it('should add a home-icon component for each element in the items array', () => {
      const icons = TestHelper.getAllElementsByAngular(
         fixture,
         HomeIconComponent
      );

      expect(icons.length).toEqual(items.length);
   });

   it('should add one less arrow component than the number of icons', () => {
      const arrows = TestHelper.getAllElementsByAngular(
         fixture,
         HomeArrowWrapperComponent
      );

      expect(arrows.length).toEqual(items.length - 1);
   });
});
