import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HelperTextService } from '../../services/helper-text.service';
import { HelperText } from '../../models/helper-text.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-helper-text',
  templateUrl: './helper-text.component.html',
  styleUrls: ['./helper-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelperTextComponent implements OnInit, OnDestroy {

  helperText: HelperText;
  subscription: Subscription;

  constructor(public helperTextService: HelperTextService, private cdr: ChangeDetectorRef) {
    this.helperText = {
      heading: null,
      content: 'Click the corresponding question mark for more information',
      example: null,
    };
    this.subscription = this.helperTextService.getHelperText().subscribe(message => {
      this.helperText = message.helperText;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
