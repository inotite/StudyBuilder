import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-access-denied',
    templateUrl: './access-denied.component.html',
    styleUrls: [ './access-denied.component.scss' ]
})
export class AccessDeniedComponent implements OnInit {
    SSOPortalUrl: string;

    ngOnInit() {
        this.SSOPortalUrl = this.getSSOPortalUrl();
    }

    getSSOPortalUrl(): string {
        return environment.settings.SSOPortalUrl;
    }
}
