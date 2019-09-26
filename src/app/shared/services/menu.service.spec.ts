import { StudyTypes } from './../models/study-types.model';
import { ConfigService } from './config.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MenuService } from './menu.service';
import { MenuData } from '../models/menu-data.model';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { homePageIconUrl } from '../helpers/url.constant';

describe('MenuService',
  () => {
    const studyType = StudyTypes.IRT;
    const url = homePageIconUrl + '/' + (studyType as number);
    let menuService: MenuService;
    let httpMock: HttpTestingController;
    let menus: MenuData;
    let configServiceStub: Partial<ConfigService>;
    let configService: ConfigService;

    beforeEach(() => {
      configServiceStub = {
        getStudyType: () => {
          return new BehaviorSubject(studyType);
        }
      };

      TestBed.configureTestingModule({
        providers: [
          MenuService,
          {
            provide: ConfigService,
            useValue: configServiceStub
          }
        ],
        imports: [
          HttpClientTestingModule
        ]
      });

      menus = {
        studySetup: [
          {
            'textKey': 'Study Settings',
            'cssIcon': 'fa fa-cogs',
            'isDone': false,
            'url': '/StudySettings',
            'isBelowBar': false,
            'displayName': 'Study Settings'
          },
          {
            'textKey': 'Languages',
            'cssIcon': 'fa fa-language',
            'isDone': false,
            'url': '/',
            'isBelowBar': false,
            'displayName': 'Languages'
          }
        ],
        configure: [
          {
            'textKey': 'Questionnaire',
            'cssIcon': 'fa fa-book-open',
            'isDone': false,
            'url': 'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/Questionnaire',
            'isBelowBar': false,
            'displayName': 'Questionnaire'
          },
          {
            'textKey': 'Visits',
            'cssIcon': 'fa fa-hospital',
            'isDone': false,
            'url': 'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/Visit',
            'isBelowBar': false,
            'displayName': 'Visits'
          }
        ],
        document: [
          {
            'textKey': 'Screen Reports',
            'cssIcon': 'fa fa-chart-line',
            'isDone': false,
            'url': '/',
            'isBelowBar': false,
            'displayName': 'Screen Reports'
          },
          {
            'textKey': 'Data Model',
            'cssIcon': 'fa fa-chart-line',
            'isDone': false,
            'url': '/',
            'isBelowBar': false,
            'displayName': 'Data Model'
          }
        ],
        customize: [
          {
            'textKey': 'Business Rules',
            'cssIcon': null,
            'isDone': false,
            'url': 'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/BusinessRule',
            'isBelowBar': false,
            'displayName': 'Business Rules'
          },
          {
            'textKey': 'Calculations',
            'cssIcon': null,
            'isDone': false,
            'url': 'http://dev-yprime-develop.eclinicalcloud.net/yprime_developStudyPortal/Calculation',
            'isBelowBar': false,
            'displayName': 'Calculations'
          }
        ]
      };

      menuService = TestBed.get(MenuService);
      httpMock = TestBed.get(HttpTestingController);

      configService = TestBed.get(ConfigService);
      spyOn(configService, 'getStudyType').and.callThrough();
    });

    it('when created will not make the HTTP get call',
      () => {
        httpMock.expectNone(url);

        httpMock.verify();
      });

    it('when created will not call ConfigService getStudyType',
      () => {
        expect(configService.getStudyType).not.toHaveBeenCalled();
      });

    it('when getMenus is called will call ConfigService getStudyType',
      () => {
        menuService.getMenus();

        httpMock.expectOne(url)
          .flush(menus);

        expect(configService.getStudyType).toHaveBeenCalled();
      });

    it('when getMenus is called will make the HTTP get call for the Menu Items',
      () => {
        menuService.getMenus();

        httpMock.expectOne(url)
          .flush(menus);

        httpMock.verify();
      });

    it('when getMenus is called, will return an Observable with the menus',
      () => {
        let menuGroups: MenuData;
        menuService.getMenus()
          .subscribe((groups: MenuData) => menuGroups = groups);

        httpMock.expectOne(url)
          .flush(menus);

        expect(menuGroups).toEqual(menus);

        httpMock.verify();
      });
  });
