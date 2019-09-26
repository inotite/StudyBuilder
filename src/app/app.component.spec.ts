import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appInstance: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        appInstance = fixture.componentInstance;
      });
  }));

  it('should create the app', () => {
    expect(appInstance).toBeTruthy();
  });

  it(`should have as title 'YPrime StudyBuilder'`, () => {
    expect(appInstance.appTitle).toEqual('YPrime StudyBuilder');
  });

});
