import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MuiConfirmationDialogComponent } from './mui-confirmation-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialUIModule } from '../../material-ui/material-ui.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MuiConfirmationDialog } from './mui-confirmation-dialog.model';
import { TestHelper } from 'src/app/shared/helpers/test.helper';

describe('MuiConfirmationDialogComponent with a stubbed dialog configuration', () => {
  const dialogConfigData = <MuiConfirmationDialog> {
    title: 'DummyConfirmation',
    message: 'Sample message can we proceed?',
    yesButtonTitle: 'Y',
    noButtonTitle: 'N'
  };

  let component: MuiConfirmationDialogComponent;
  let fixture: ComponentFixture<MuiConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuiConfirmationDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogConfigData
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
       ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MaterialUIModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuiConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the confirmation dialog settings correctly', () => {
    expect(component.settings).toEqual(dialogConfigData);
  });

  it('should display confirmation message correctly', () => {
    const stub = TestHelper.getElementByCss(fixture, 'p');
    expect(stub.innerText).toEqual('Sample message can we proceed?');
  });

  it('should display NoButton title correctly', () => {
    const stub = TestHelper.getAllElementsByCss(fixture, 'button');
    const matches = stub.filter(item => item.nativeElement.className === 'mat-flat-button mat-accent');
    expect(matches[0].nativeElement.innerText).toBeDefined();
    expect(matches[0].nativeElement.innerText).toEqual('N');
  });

  it('should display YesButton title correctly', () => {
    const stub = TestHelper.getAllElementsByCss(fixture, 'button');
    const matches = stub.filter(item => item.nativeElement.className === 'mat-flat-button mat-primary');
    expect(matches[0].nativeElement.innerText).toBeDefined();
    expect(matches[0].nativeElement.innerText).toEqual('Y');
  });

  it('should display blank confirmation dialog when no settings are provided', () => {
    component.settings = null;
    fixture.detectChanges();

    const stub = TestHelper.getElementByCss(fixture, 'p');
    expect(stub.innerText).toBe('');

    const buttons = TestHelper.getAllElementsByCss(fixture, 'button');
    expect(buttons.length).toBe(0);
  });
});
