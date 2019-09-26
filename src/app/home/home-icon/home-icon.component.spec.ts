import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIconComponent } from './home-icon.component';
import { MenuItem } from './../../shared/models/menu-item.model';
import { TestHelper } from './../../shared/helpers/test.helper';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeIconComponent', () => {
   let component: HomeIconComponent;
   let fixture: ComponentFixture<HomeIconComponent>;
   let icon: MenuItem;
   let routeStub: any;
   let routeObservable: BehaviorSubject<Event>;

   beforeEach(async(() => {
      routeObservable = new BehaviorSubject(new Event('test'));
      routeStub = {
         events: routeObservable
      };

      TestBed.configureTestingModule({
         declarations: [HomeIconComponent],
         providers: [{ provide: Router, useValue: routeStub }],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .compileComponents()
         .then(() => {
            icon = {
               textKey: 'test key',
               displayName: 'display name',
               cssIcon: 'test-class',
               isDone: false,
               url: '/test',
               isBelowBar: true
            };

            fixture = TestBed.createComponent(HomeIconComponent);
            component = fixture.componentInstance;
            component.icon = icon;

            fixture.detectChanges();
         });
   }));

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should include an anchor tag', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'a'
      ) as HTMLAnchorElement;

      expect(element).toBeTruthy();
   });

   it('should assign the Icon\'s url to the routerLink on the anchor tag', () => {
      const element = TestHelper.getElementByCss(fixture, 'a');

      expect(element.routerLink).toContain(icon.url);
   });

   it('should create an i tag with the Icon\'s CSS class', () => {
      const element = TestHelper.getElementByCss(fixture, `i.${icon.cssIcon}`);

      expect(element).toBeTruthy();
   });

   it('should not include the check i tag if the icon is not done', () => {
      icon.isDone = false;
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i.fa-check');

      expect(element).toBeNull();
   });

   it('should include the check i tag if the icon is done', () => {
      icon.isDone = true;
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, 'i.fa-check');

      expect(element).toBeTruthy();
   });

   it('should include a label', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'label'
      ) as HTMLLabelElement;

      expect(element).toBeTruthy();
   });

   it('should set the Icon\'s display name as the inner text of the label', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'label'
      ) as HTMLLabelElement;

      expect(element.innerText).toEqual(icon.displayName);
   });

   // The i18n attribute does not stay on the element when it gets rendered, so we can't test that value.
});
