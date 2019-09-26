import { MenuData } from './../../shared/models/menu-data.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { HomeBodyComponent } from './home-body.component';
import { HomeVerticalRowComponent } from './../home-vertical-row/home-vertical-row.component';
import { HomeHorizontalRowComponent } from './../home-horizontal-row/home-horizontal-row.component';

import { MenuService } from '../../shared/services/menu.service';
import { TestHelper } from '../../shared/helpers/test.helper';

describe('HomeBodyComponent', () => {
  let component: HomeBodyComponent;
  let fixture: ComponentFixture<HomeBodyComponent>;
  let menuServiceStub: Partial<MenuService>;
  let menuService: MenuService;
  let items: MenuData;
  let emptyItems: MenuData;
  let menuObservable: Subject<MenuData>;

  beforeEach(async(() => {
    emptyItems = {
      studySetup: [],
      configure: [],
      document: [],
      customize: []
    };
    items = {
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

    menuServiceStub = {
      getMenus: () => {
        menuObservable = new BehaviorSubject(items);
        return menuObservable;
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        HomeBodyComponent,
        HomeHorizontalRowComponent,
        HomeVerticalRowComponent
      ],
      providers: [
        {
          provide: MenuService,
          useValue: menuServiceStub
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeBodyComponent);
        component = fixture.componentInstance;
        menuService = fixture.debugElement.injector.get(MenuService);
        spyOn(menuService, 'getMenus').and.callThrough();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('will not call MenuService getMenus if OnInit is not called', () => {
    expect(menuService.getMenus).not.toHaveBeenCalled();
  });

  it('should call to the Menu Service getMenus during OnInit', () => {
    component.ngOnInit();

    expect(menuService.getMenus).toHaveBeenCalled();
  });

  it('will unsubscribe from MenuService\'s getMenus observable in ngOnDestroy', () => {
    let testItems: MenuData;

    menuObservable.subscribe((data: MenuData) => (testItems = data));

    component.ngOnInit();
    component.ngOnDestroy();

    // If we successfully unsubscribed within ngOnDestroy, this value won't get assigned
    menuObservable.next({} as MenuData);

    expect(testItems).toEqual(items);
  });

  it('should add 3 home-horizontal rows', () => {
    fixture.detectChanges();
    const elements = TestHelper.getAllElementsByAngular(
      fixture,
      HomeHorizontalRowComponent
    );

    expect(elements.length).toEqual(3);
  });

  it('should not add 3 home-horizontal rows if there is no menu data', () => {
    fixture.detectChanges();
    menuObservable.next(emptyItems);
    fixture.detectChanges();

    const elements = TestHelper.getAllElementsByAngular(
      fixture,
      HomeHorizontalRowComponent
    );

    expect(elements.length).toEqual(0);
  });

  it('should add 1 home-vertical-row', () => {
    fixture.detectChanges();
    const elements = TestHelper.getAllElementsByAngular(
      fixture,
      HomeVerticalRowComponent
    );

    expect(elements.length).toEqual(1);
  });

  it('should not add 1 home-vertical-row if there is no menu data', () => {
    fixture.detectChanges();
    menuObservable.next(emptyItems);
    fixture.detectChanges();

    const elements = TestHelper.getAllElementsByAngular(
      fixture,
      HomeHorizontalRowComponent
    );

    expect(elements.length).toEqual(0);
  });

  it('should wrap the home-vertical-row in a div with class right', () => {
    fixture.detectChanges();
    const element = TestHelper.getElementByCss(
      fixture,
      'div.right app-home-vertical-row'
    );

    expect(element).toBeTruthy();
  });
});
