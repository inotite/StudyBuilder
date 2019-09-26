import { PanelDirective } from './panel.directive';
import { ViewContainerRef, ElementRef } from '@angular/core';

describe('PanelDirective', () => {
   let viewContainer: ViewContainerRef;

   beforeEach(() => {
      viewContainer = {
         element: {} as ElementRef<any>
      } as ViewContainerRef;
   });

   it('should create an instance', () => {
      const directive = new PanelDirective(viewContainer);
      expect(directive).toBeTruthy();
   });
});
