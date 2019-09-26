import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExpandableListComponent} from './expandable-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialUIModule} from '../../material-ui/material-ui.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ExpandableListComponent', () => {
   let component: ExpandableListComponent;
   let fixture: ComponentFixture<ExpandableListComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ExpandableListComponent],
         schemas: [CUSTOM_ELEMENTS_SCHEMA],
         imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientTestingModule, MaterialUIModule]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ExpandableListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should display a subset of items in collapsed state', () => {
      fixture = TestBed.createComponent(ExpandableListComponent);
      component = fixture.componentInstance;
      component.items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];
      component.columnCount = 3;
      fixture.detectChanges();
      const expandedMessage = fixture.nativeElement.querySelectorAll('.expandedMessage');
      expect(expandedMessage[0].innerText).toBe('item 1 , item 2 , item 3');
   });

   it('should display all items when count is less than configured value', () => {
      fixture = TestBed.createComponent(ExpandableListComponent);
      component = fixture.componentInstance;
      component.items = ['item 1', 'item 2'];
      component.columnCount = 3;
      fixture.detectChanges();

      const expandedMessage = fixture.nativeElement.querySelectorAll('.expandedMessage');
      expect(expandedMessage[0].innerText).toBe('item 1 , item 2');
   });
});
