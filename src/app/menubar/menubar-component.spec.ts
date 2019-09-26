import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { MenuData } from './../shared/models/menu-data.model';
import { TestHelper } from './../shared/helpers/test.helper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../shared/services/config.service';
import { MenuService } from '../shared/services/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { MenubarComponent } from './menubar-component';
import { Subject, BehaviorSubject } from 'rxjs';
import { WindowService } from '../shared/services/window.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { StudyTypes } from '../shared/models/study-types.model';
import { DashCasePipe } from '../yprime-artifacts/pipes/dash-case.pipe';

describe('MenubarComponentComponent', () => {
   let component: MenubarComponent;
   let fixture: ComponentFixture<MenubarComponent>;
   let routeStub: any;
   let routeObservable: Subject<Event>;
   let windowStub: WindowService;
   let windowService: WindowService;
   let title = 'start';
   let titleStub: Partial<Title>;
   let titleService: Title;
   let configStub: Partial<ConfigService>;
   let configService: ConfigService;
   let studyType: StudyTypes;
   let configObservable: Subject<StudyTypes>;
   let menuStub: Partial<MenuService>;
   let menuService: MenuService;
   let menus: MenuData;
   let menuObservable: Subject<MenuData>;

   beforeEach(async(() => {
      menus = {
         studySetup: [
            {
               textKey: 'Study Settings',
               cssIcon: 'fa fa-cogs',
               isDone: false,
               url: '/StudySettings',
               isBelowBar: false,
               displayName: 'Study Settings'
            },
            {
               textKey: 'Languages',
               cssIcon: 'fa fa-language',
               isDone: false,
               url: '/',
               isBelowBar: false,
               displayName: 'Languages'
            }
         ],
         configure: [
            {
               textKey: 'Questionnaire',
               cssIcon: 'fa fa-book-open',
               isDone: false,
               url:
                  'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/Questionnaire',
               isBelowBar: false,
               displayName: 'Questionnaire'
            },
            {
               textKey: 'Visits',
               cssIcon: 'fa fa-hospital',
               isDone: false,
               url:
                  'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/Visit',
               isBelowBar: false,
               displayName: 'Visits'
            }
         ],
         document: [
            {
               textKey: 'Screen Reports',
               cssIcon: 'fa fa-chart-line',
               isDone: false,
               url: '/',
               isBelowBar: false,
               displayName: 'Screen Reports'
            },
            {
               textKey: 'Data Model',
               cssIcon: 'fa fa-chart-line',
               isDone: false,
               url: '/',
               isBelowBar: false,
               displayName: 'Data Model'
            }
         ],
         customize: [
            {
               textKey: 'Business Rules',
               cssIcon: null,
               isDone: false,
               url:
                  'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/BusinessRule',
               isBelowBar: false,
               displayName: 'Business Rules'
            },
            {
               textKey: 'Calculations',
               cssIcon: null,
               isDone: false,
               url:
                  'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/Calculation',
               isBelowBar: false,
               displayName: 'Calculations'
            }
         ]
      };

      menuStub = {
         getMenus: () => {
            menuObservable = new BehaviorSubject(menus);
            return menuObservable;
         }
      };

      studyType = StudyTypes.IRT;

      configStub = {
         getStudyType: () => {
            configObservable = new BehaviorSubject(studyType);
            return configObservable;
         }
      };

      routeObservable = new BehaviorSubject(new Event('test'));
      routeStub = {
         events: routeObservable
      };

      windowStub = {
         nativeWindow: {
            location: {
               pathname: '/test'
            }
         }
      };

      titleStub = {
         setTitle: (newTitle: string) => {
            title = newTitle;
         }
      };

      TestBed.configureTestingModule({
         declarations: [MenubarComponent, DashCasePipe],
         imports: [FormsModule, NgbModule, HttpClientModule],
         providers: [
            {
               provide: ConfigService,
               useValue: configStub
            },
            {
               provide: MenuService,
               useValue: menuStub
            },
            {
               provide: Router,
               useValue: routeStub
            },
            {
               provide: WindowService,
               useValue: windowStub
            },
            {
               provide: Title,
               useValue: titleStub
            }
         ],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .compileComponents()
         .then(() => {
            fixture = TestBed.createComponent(MenubarComponent);
            component = fixture.componentInstance;
            windowService = fixture.debugElement.injector.get(WindowService);
            titleService = fixture.debugElement.injector.get(Title);
            configService = fixture.debugElement.injector.get(ConfigService);
            menuService = fixture.debugElement.injector.get(MenuService);

            fixture.detectChanges();
         });
   }));

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('when window location is not home will include nav', () => {
      changeWindowLocation('dummy');
      const nav = TestHelper.getElementByCss(fixture, 'nav');

      expect(nav).toBeTruthy();
   });

   it('when window location is home will not include nav', () => {
      changeWindowLocation('');
      const nav = TestHelper.getElementByCss(fixture, 'nav');

      expect(nav).toBeFalsy();
   });

   it('will unsubscribe from Router Events observable in ngOnDestroy', () => {
      changeWindowLocation('dummy');
      component.ngOnDestroy();
      changeWindowLocation('home');
      const nav = TestHelper.getElementByCss(fixture, 'nav');

      expect(nav).toBeTruthy();
   });

   it('will set the StudyType to the value sent from the Config Service', () => {
      const type = StudyTypes.Unified;
      configObservable.next(type);

      expect(component.studyType).toEqual(StudyTypes[type]);
   });

   it('will set the StudyType to "Unknown" when null sent from Config Service', () => {
      configObservable.next(null);

      expect(component.studyType).toEqual('Unknown');
   });

   it('will set the StudyType to "Unknown" when invalid StudyTypes value from ConfigService', () => {
      configObservable.next(4 as StudyTypes);

      expect(component.studyType).toEqual('Unknown');
   });

   it('will set the StudyType to "eCOA" when that value sent from Config Service', () => {
      configObservable.next(StudyTypes.eCOA);

      expect(component.studyType).toEqual('eCOA');
   });

   it('will set the StudyType to "IRT" when that value sent from Config Service', () => {
      configObservable.next(StudyTypes.IRT);

      expect(component.studyType).toEqual('IRT');
   });

   it('will set the StudyType to "Unified" when that value sent from Config Service', () => {
      configObservable.next(StudyTypes.Unified);

      expect(component.studyType).toEqual('Unified');
   });

   it('will set the inner text of a span to the Study Type text', () => {
      const span = TestHelper.getElementByCss(
         fixture,
         '#study-type span'
      ) as HTMLSpanElement;

      expect(span.innerText).toEqual(StudyTypes[studyType]);
   });

   it('will unsubscribe from ConfigService\'s getStudyType observable in ngOnDestroy', () => {
      const finalType = StudyTypes.Unified;
      configObservable.next(finalType);
      component.ngOnDestroy();
      configObservable.next(StudyTypes.eCOA);

      expect(component.studyType).toEqual(StudyTypes[finalType]);
   });

   it('will create a ListItem for each item from MenuService getMenus', () => {
      const items = TestHelper.getAllElementsByCss(fixture, 'li.MENU_GAP');

      expect(items.length).toEqual(Object.keys(menus).length);
   });

   it('will set each ListItem to the reformatted text', () => {
      const items = TestHelper.getAllElementsByCss(fixture, 'li.MENU_GAP');

      Object.keys(menus).forEach((data: any, index: number) => {
         const expected = component.lookupDisplayText(data);
         const actual = (items[index].nativeElement as HTMLLIElement)
            .getElementsByTagName('div')[0]
            .getElementsByTagName('button')[0];

         expect(actual.innerText).toEqual(expected);
      });
   });

   it('will create a child button for every child item from MenuService getMenus', () => {
      const items = TestHelper.getAllElementsByCss(
         fixture,
         'div.d-inline-block div button.MENU_COLOR'
      );
      let expected: MenuItem[] = [];
      Object.keys(menus).forEach((menu: any) => {
         expected = expected.concat(menus[menu]);
      });

      expect(items.length).toEqual(expected.length);
   });

   it('will set each child button\'s innerText to the sub item\'s displayName property', () => {
      const buttons = TestHelper.getAllElementsByCss(
         fixture,
         'div.d-inline-block div button.MENU_COLOR'
      );
      let expected: MenuItem[] = [];
      Object.keys(menus).forEach((menu: any) => {
         expected = expected.concat(menus[menu]);
      });

      for (let i = 0; i < expected.length; i++) {
         const button = buttons[i].nativeElement as HTMLButtonElement;
         const dataItem = expected[i];

         expect(dataItem.displayName).toEqual(button.innerText);
      }
   });

   it('will unsubscribe from MenuService\'s getenus observable in ngOnDestroy', () => {
      const testItems: MenuData = {
         studySetup: [],
         configure: [],
         document: [],
         customize: []
      };
      component.ngOnDestroy();
      menuObservable.next(testItems);
      fixture.detectChanges();

      let actual: MenuItem[] = [];
      Object.keys(menus).forEach((menu: any) => {
         actual = actual.concat(menus[menu]);
      });
      const expected = TestHelper.getAllElementsByCss(
         fixture,
         'li.MENU_GAP div div button'
      );

      expect(expected.length).toEqual(actual.length);
   });

   it('will set the file name of the YPrime image', () => {
      const image = TestHelper.getElementByCss(
         fixture,
         'img'
      ) as HTMLImageElement;

      expect(image.src).toContain(component.iconFile);
   });

   it('will set the homeIcon class on the navbar-brand i element', () => {
      const i = TestHelper.getElementByCss(
         fixture,
         'a.navbar-brand.MENU_COLOR i'
      ) as HTMLElement;

      expect(i.className).toContain(component.homeIcon);
   });

   it('will set the userInfoIcon class on the nav-link i element', () => {
      const i = TestHelper.getElementByCss(
         fixture,
         'a.nav-link.MENU_COLOR i'
      ) as HTMLElement;

      expect(i.className).toContain(component.userInfoIcon);
   });

   it('will set the Title of the page to the appTitle', () => {
      expect(title).toEqual(component.appTitle);
   });

   function changeWindowLocation(path: string): void {
      windowService.nativeWindow.location.pathname = '/' + path;
      routeObservable.next(new Event('test'));
      fixture.detectChanges();
   }
});
