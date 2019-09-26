import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MenuItem } from '../../shared/models/menu-item.model';
import { MenuService } from '../../shared/services/menu.service';

@Component({
   selector: 'app-home-body',
   templateUrl: './home-body.component.html',
   styleUrls: ['./home-body.component.scss']
})
export class HomeBodyComponent implements OnInit, OnDestroy {
   studySetupIcons: MenuItem[];
   configureIcons: MenuItem[];
   documentIcons: MenuItem[];
   customizeIcons: MenuItem[];
   showIcons: boolean;
   private unsubscribe = new Subject<void>();

   // Putting these into variables so we can internationalize this later.
   studySetupTitle = 'Study Setup';
   configureTitle = 'Configure';
   documentTitle = 'Document';
   customizeTitle = 'Customize';

   constructor(private readonly menuService: MenuService) {}

   ngOnInit() {
      this.menuService
         .getMenus()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(items => {
            this.studySetupIcons = items['studySetup']
               ? items['studySetup']
               : [];
            this.configureIcons = items['configure'] ? items['configure'] : [];
            this.documentIcons = items['document'] ? items['document'] : [];
            this.customizeIcons = items['customize'] ? items['customize'] : [];
            this.showIcons =
               this.studySetupIcons.length > 0 ||
               this.configureIcons.length > 0 ||
               this.documentIcons.length > 0 ||
               this.customizeIcons.length > 0;
         });
   }

   ngOnDestroy() {
      this.unsubscribe.next();
      this.unsubscribe.complete();
   }
}
