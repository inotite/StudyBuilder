import {
  Directive,
  Renderer2,
  Input,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective implements OnInit, OnDestroy {
  @Input('appBackgroundImage') observable: Observable<string>;
  private subscription: Subscription;

  constructor(private readonly elRef: ElementRef, private readonly renderer: Renderer2) { }

  ngOnInit() {
    this.subscription = this.observable.subscribe((url: string) => {
      this.renderer.setStyle(this.elRef.nativeElement, 'background-image', `url(${ url })`);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
