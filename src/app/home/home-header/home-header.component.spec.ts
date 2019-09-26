import { TestHelper } from './../../shared/helpers/test.helper';
import { ConfigService } from './../../shared/services/config.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderComponent } from './home-header.component';
import { BackgroundImageDirective } from '../../shared/directives/background-image.directive';
import { Subject, BehaviorSubject } from 'rxjs';
import { StudyTypes } from 'src/app/shared/models/study-types.model';
import { DropdownComponent } from 'src/app/yprime-artifacts/components/dropdown/dropdown.component';

describe('HomeHeaderComponent', () => {
  const studyType = StudyTypes.Unified;
  const bannerUrl = 'banner.png';
  const logoUrl = 'yprime.png';
  const iconUrl = 'fav.ico';
  let component: HomeHeaderComponent;
  let fixture: ComponentFixture<HomeHeaderComponent>;
  let configServiceStub: Partial<ConfigService>;
  let configService: ConfigService;
  let studyTypeObservable: Subject<StudyTypes>;
  let homeBannerObservable: Subject<string>;
  let yPrimeLogoObservable: Subject<string>;
  let favIconObservable: Subject<string>;
  let setType: StudyTypes;

  beforeEach(async(() => {
    setType = null;
    configServiceStub = {
      getStudyType: () => {
        studyTypeObservable = new BehaviorSubject(studyType);
        return studyTypeObservable;
      },
      getHomePageBannerPath: () => {
        homeBannerObservable = new BehaviorSubject(bannerUrl);
        return homeBannerObservable;
      },
      getYPrimeLogoPath: () => {
        yPrimeLogoObservable = new BehaviorSubject(logoUrl);
        return yPrimeLogoObservable;
      },
      getFavIconPath: () => {
        favIconObservable = new BehaviorSubject(iconUrl);
        return favIconObservable;
      },
      setStudyType: (value: StudyTypes) => {
        setType = value;
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        HomeHeaderComponent,
        BackgroundImageDirective,
        DropdownComponent
      ],
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceStub
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeHeaderComponent);
        component = fixture.componentInstance;
        configService = fixture.debugElement.injector.get(ConfigService);

        spyOn(configService, 'getStudyType').and.callThrough();
        spyOn(configService, 'getHomePageBannerPath').and.callThrough();
        spyOn(configService, 'getYPrimeLogoPath').and.callThrough();
        spyOn(configService, 'setStudyType').and.callThrough();
        spyOn(configService, 'getFavIconPath').and.callThrough();
      });
  }));

  it('should create the Component', () => {
    expect(component).toBeTruthy();
  });

  it('will not call ConfigService getHomePageBannerPath if OnInit is not called',
    () => {
      expect(configService.getHomePageBannerPath).not.toHaveBeenCalled();
    });

  it('will not call ConfigService getYPrimeLogoPath if OnInit is not called',
    () => {
      expect(configService.getYPrimeLogoPath).not.toHaveBeenCalled();
    });

  it('will not call ConfigService getStudyType if OnInit is not called',
    () => {
      expect(configService.getStudyType).not.toHaveBeenCalled();
    });

  it('will call ConfigService getHomePageBannerPath if OnInit is not called',
    () => {
      component.ngOnInit();

      expect(configService.getHomePageBannerPath).toHaveBeenCalled();
    });

  it('will call ConfigService getYPrimeLogoPath if OnInit is not called',
    () => {
      component.ngOnInit();

      expect(configService.getYPrimeLogoPath).toHaveBeenCalled();
    });

  it('will call ConfigService getStudyType if OnInit is not called',
    () => {
      component.ngOnInit();

      expect(configService.getStudyType).toHaveBeenCalled();
    });

  it('will unsubscribe its own Background Observable in ngOnDestroy',
    () => {
      let image: string;

      component.backgroundObservable.subscribe((url: string) => image = url);

      component.ngOnInit();
      component.ngOnDestroy();

      // If we unsubscribed, this won't get assigned
      component.backgroundObservable.next('');

      expect(image).toEqual(bannerUrl);
    });

  it('will unsubscribe from ConfigService\'s Banner observable in ngOnDestroy',
    () => {
      let image: string;

      homeBannerObservable.subscribe((url: string) => image = url);

      component.ngOnInit();
      component.ngOnDestroy();

      homeBannerObservable.next('');

      expect(image).toEqual(bannerUrl);
    });

  it('will unsubscribe from ConfigService\'s Logo observable in ngOnDestroy',
    () => {
      let image: string;

      yPrimeLogoObservable.subscribe((url: string) => image = url);

      component.ngOnInit();
      component.ngOnDestroy();

      yPrimeLogoObservable.next('');

      expect(image).toEqual(logoUrl);
    });

  it('will unsubscribe from ConfigService\'s StudyType observable in ngOnDestroy',
    () => {
      let type: StudyTypes;

      studyTypeObservable.subscribe((data: StudyTypes) => type = data);

      component.ngOnInit();
      component.ngOnDestroy();

      studyTypeObservable.next(null);

      expect(type).toEqual(studyType);
    });

  it('should contain an image.',
    () => {
      const element = TestHelper.getElementByCss(fixture, '#homeHeaderLogo') as HTMLImageElement;

      expect(element).toBeTruthy();
    });

  it('should assign the Component\'s yPrimeLogoUrl to the source of the image',
    () => {
      // Bring up the initial setting of the properties.
      fixture.detectChanges();
      // Manually change the value, and reset the UI. (Won't call ngOnit again.)
      const url = '/test.png';
      component.yPrimeLogoUrl = url;
      fixture.detectChanges();

      const element = TestHelper.getElementByCss(fixture, '#homeHeaderLogo') as HTMLImageElement;

      expect(element.src).toContain(url);
    });

  it('should call the BackgroundImageDirective with the Component\'s headerBackgroundUrl',
    () => {
      fixture.detectChanges();

      const testUrl = 'test.png';
      component.backgroundObservable.next(testUrl);

      const element = TestHelper.getElementByAngular(fixture, BackgroundImageDirective) as HTMLDivElement;

      expect(element.style.backgroundImage).toEqual(`url("${testUrl}")`);
    });

  it('should add a Dropdown Component',
    () => {
      const dropdown = TestHelper.getElementByAngular(fixture, DropdownComponent);

      expect(dropdown).toBeTruthy();
    });

  it('will set the StudyType when calling changedStudyType',
    () => {
      component.changedStudyType(studyType.toString());

      expect(setType).toEqual(studyType);
    });

  it('will set the StudyType to -1 when calling changedStudyType with a non number',
    () => {
      component.changedStudyType('Some random text');

      expect(setType).toEqual(-1);
    });

  it('will set the selectedItem to null if the study type is not greater than -1',
    () => {
      fixture.detectChanges();
      studyTypeObservable.next(-1);
      expect(component.studyTypeOptions.selectedItem).toEqual(null);
    });

  it('will set the selectedItem to the value if the study type is greater than -1',
    () => {
      fixture.detectChanges();
      studyTypeObservable.next(StudyTypes.eCOA);
      expect(component.studyTypeOptions.selectedItem).toEqual(StudyTypes.eCOA.toString());
    });
});
