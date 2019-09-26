import { WindowService } from './../shared/services/window.service';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToURLComponent } from './redirect-to-url.component';

describe('RedirectToURLComponent', () => {
  let component: RedirectToURLComponent;
  let fixture: ComponentFixture<RedirectToURLComponent>;
  let routeStub: any;
  let windowStub: WindowService;
  let windowService: WindowService;
  const testUrl = 'http://example.com';

  beforeEach(async(() => {
    // Can't do Partial<ActivatedRoute> because that has other properties marked as required
    routeStub = {
      snapshot: {
        params: {
          url: testUrl
        }
      }
    };

    windowStub = {
      nativeWindow: {
        location: {
          href: ''
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        RedirectToURLComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeStub
        },
        {
          provide: WindowService,
          useValue: windowStub
        }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RedirectToURLComponent);
      windowService = fixture.debugElement.injector.get(WindowService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the window location on initialization',
    () => {
      expect(windowService.nativeWindow.location.href).toEqual(testUrl);
    });
});
