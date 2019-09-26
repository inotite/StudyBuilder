import { WindowWrapper } from '../shared/models/window-wrapper.model';
import { WindowService } from './../shared/services/window.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: '<i style="margin-top:20px;margin-left:25px;" class="fa fa-spin fa-spinner fa-4x"></i>'
})
export class RedirectToURLComponent implements OnInit {
  private targetURL: string;
  private readonly window: WindowWrapper;

  constructor(windowRef: WindowService,
              private route: ActivatedRoute) {
    this.window = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.targetURL = this.route.snapshot.params.url;
    this.window.location.href = this.targetURL;
  }
}
