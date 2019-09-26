import { WindowService } from '../../shared/services/window.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AddQuestionnaireComponent } from './add-questionnaire.component';
import {TestHelper} from '../../shared/helpers/test.helper';
import {QuestionnairesService} from '../../shared/services/questionnaires.service';
import {Observable, Subject} from 'rxjs';
import SpyObj = jasmine.SpyObj;

describe('AddQuestionnaireComponent', () => {
  let component: AddQuestionnaireComponent;
  let fixture: ComponentFixture<AddQuestionnaireComponent>;
  let routeStub: any;
  let activatedRouteStub: any;
  const testUrl = 'http://example.com';
  let passedRoutes: string[];
  let newParams: any;
  const anyObservable = new Subject<any>();
  let questionnairesServiceSpy: SpyObj<QuestionnairesService>;

  beforeEach(async(() => {
    activatedRouteStub = {
      name: 'This is the object created in the tests!'
    };
    passedRoutes = null;
    newParams = null;

    routeStub = {
      navigate: (newRoute: string[], param: any) => {
        passedRoutes = newRoute;
        newParams = param;
      }
    };

     questionnairesServiceSpy = jasmine.createSpyObj('QuestionnairesService', ['cancelQuestionnaireSubscription']);
     questionnairesServiceSpy.cancelQuestionnaireSubscription.and.returnValue(anyObservable);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AddQuestionnaireComponent ],
      providers: [
        {
          provide: Router,
          useValue: routeStub
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
         {
            provide: QuestionnairesService,
            useValue: questionnairesServiceSpy
         }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onAddQuestionnaire when add questionnaire is clicked', async () => {
     spyOn(component, 'onAddQuestionnaire');
     const button = TestHelper.getElementByCss(fixture, 'button') as HTMLButtonElement;
     button.click();

     fixture.whenStable().then(() => {
       expect(component.onAddQuestionnaire).toHaveBeenCalled();
     });
  });

  it('should assign questionnaire-form as the new route when onAddQuestionnaire is called', () => {
    component.onAddQuestionnaire();

    expect(passedRoutes).toContain('questionnaire-form');
  });

  it('will pass the activated route as the relativeTo parameter when onAddQuestionnaire is called', () => {
    component.onAddQuestionnaire();

    expect(newParams.relativeTo).toEqual(activatedRouteStub);
  });

  it('should subscribe to questionnaire canceling', () => {
      expect(questionnairesServiceSpy.cancelQuestionnaireSubscription.calls.count())
         .toBe(1);
  });

   it('should set isDisabled to true when questionnaire cancel subcription passes value', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      anyObservable.next();
      expect(component.isDisabled).toBeFalsy();
   });
});
