import {BehaviorSubject} from 'rxjs';
import {StudyTypes} from './../shared/models/study-types.model';
import {ConfigService} from './../shared/services/config.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {HomeComponent} from './home.component';
import {HomeHeaderComponent} from './home-header/home-header.component';
import {HomeBodyComponent} from './home-body/home-body.component';
import {BackgroundImageDirective} from '../shared/directives/background-image.directive';
import {TestHelper} from '../shared/helpers/test.helper';
import {MenuService} from '../shared/services/menu.service';
import {MenuData} from '../shared/models/menu-data.model';

describe('HomeComponent', () => {
   let component: HomeComponent;
   let fixture: ComponentFixture<HomeComponent>;
   let menuServiceStub: Partial<MenuService>;
   let configServiceStub: Partial<ConfigService>;

   beforeEach(async(() => {
      menuServiceStub = {
         getMenus: () => {
            return new BehaviorSubject({} as MenuData);
         }
      };

      configServiceStub = {
         getStudyType: () => {
            return new BehaviorSubject(StudyTypes.Unified);
         },
         getHomePageBannerPath: () => {
            return new BehaviorSubject('dummy.png');
         },
         getYPrimeLogoPath: () => {
            return new BehaviorSubject('dummy.png');
         },
         getFavIconPath: () => {
            return new BehaviorSubject('dummy.png');
         },
         setStudyType: () => {}
      };

      TestBed.configureTestingModule({
         declarations: [HomeComponent, HomeHeaderComponent, HomeBodyComponent, BackgroundImageDirective],
         providers: [
            {
               provide: ConfigService,
               useValue: configServiceStub
            },
            {
               provide: MenuService,
               useValue: menuServiceStub
            }
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
         .compileComponents()
         .then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();
         });
   }));

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('will contain a HomeHeaderComponent', () => {
      const homeHeader = TestHelper.getElementByAngular(fixture, HomeHeaderComponent);

      expect(homeHeader).toBeTruthy();
   });

   it('will create a HomeBodyComponent', () => {
      const homeBody = TestHelper.getElementByAngular(fixture, HomeBodyComponent);

      expect(homeBody).toBeTruthy();
   });

   it('will put the HomeBodyComponent inside a div with class container', () => {
      const element = TestHelper.getElementByCss(fixture, 'div.container app-home-body');

      expect(element).toBeTruthy();
   });
});
