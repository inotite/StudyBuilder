import { TestHelper } from 'src/app/shared/helpers/test.helper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelTitleComponent } from './panel-title.component';

describe('PanelTitleComponent', () => {
   let component: PanelTitleComponent;
   let fixture: ComponentFixture<PanelTitleComponent>;
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [PanelTitleComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(PanelTitleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should include an h2 tag within a title-row', () => {
      const element = TestHelper.getElementByCss(fixture, 'div.title-row h2');

      expect(element).toBeTruthy();
   });

   it('should ensure that the title is within an h2 tag', () => {
      const element = TestHelper.getElementByCss(
         fixture,
         'h2#body-title'
      ) as HTMLHeadingElement;

      expect(element).not.toBeNull();
   });
});
