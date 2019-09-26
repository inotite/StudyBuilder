import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
   selector: '[appPanel]'
})
export class PanelDirective {
   constructor(public readonly viewContainerRef: ViewContainerRef) {}
}
