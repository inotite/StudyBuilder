import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestHelper {
   static newGuidFromInt(input: number) {
      return '00000000-0000-0000-0000-' + input.toString().padStart(12, '0');
   }

   static getElementByCss(fixture: ComponentFixture<any>, css: string) {
      const element = fixture.debugElement.query(By.css(css));

      return element == null ? null : element.nativeElement;
   }

   static getAllElementsByCss(fixture: ComponentFixture<any>, css: string) {
      return fixture.debugElement.queryAll(By.css(css));
   }

   static getElementByAngular(fixture: ComponentFixture<any>, component: any) {
      const element = fixture.debugElement.query(By.directive(component));
      return element == null ? null : element.nativeElement;
   }

   static getComponentByAngular(
      fixture: ComponentFixture<any>,
      component: any
   ) {
      const element = fixture.debugElement.query(By.directive(component));

      return element == null ? null : element.componentInstance;
   }

   static getAllElementsByAngular(
      fixture: ComponentFixture<any>,
      component: any
   ) {
      return fixture.debugElement.queryAll(By.directive(component));
   }
}
