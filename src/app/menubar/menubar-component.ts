import { MenuData } from './../shared/models/menu-data.model';
import { ListItemParent } from './../shared/models/list-item-parent.model';
import { ListItemLink } from './../shared/models/list-item-link.model';
import { WindowService } from './../shared/services/window.service';
import { StudyTypes } from './../shared/models/study-types.model';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../shared/services/config.service';
import { MenuService } from '../shared/services/menu.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MenuItem } from '../shared/models/menu-item.model';
import { takeUntil } from 'rxjs/operators';
import { WindowWrapper } from '../shared/models/window-wrapper.model';

@Component({
   selector: 'app-menubar',
   templateUrl: './menubar-component.html',
   styleUrls: ['./menubar-component.scss']
})
export class MenubarComponent implements OnInit, OnDestroy {
   private static readonly defaultStudyType = 'Unknown';
   public studyType = MenubarComponent.defaultStudyType;
   public appTitle = 'YPrime StudyBuilder';
   public iconFile = 'WhiteLogo.png';
   public menuArray: ListItemParent[] = [];
   public inChildPage = true;
   public homeIcon = 'fa fa-home fa-lg';
   public userInfoIcon = 'fa fa-user-circle fa-lg';
   private window: WindowWrapper;

   private unsubscribe = new Subject<void>();

   constructor(
      private configService: ConfigService,
      private menuService: MenuService,
      private title: Title,
      private router: Router,
      windowRef: WindowService
   ) {
      this.window = windowRef.nativeWindow;
   }

   ngOnInit() {
      this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
         const path = this.window.location.pathname;
         this.inChildPage = !(path === '/' || path === '/access-denied');
      });

      this.configService
         .getStudyType()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(
            (data: StudyTypes) => this.loadConfigSettings(data),
            () => this.loadConfigSettings(null)
         );

      this.menuService
         .getMenus()
         .pipe(takeUntil(this.unsubscribe))
         .subscribe(
            (data: MenuData) => this.buildDisplayMenu(data),
            () => (this.menuArray = [])
         );

      this.title.setTitle(this.appTitle);
   }

   ngOnDestroy() {
      this.unsubscribe.next();
      this.unsubscribe.complete();
   }

   private loadConfigSettings(data: StudyTypes) {
      this.studyType =
         data !== undefined && data !== null && data in StudyTypes
            ? StudyTypes[data]
            : MenubarComponent.defaultStudyType;
   }

   private buildDisplayMenu(data: MenuData) {
      this.menuArray = [];

      Object.keys(data).forEach((item: any) => {
         const childMenu: ListItemLink[] = [];
         const subMenu = data[item];

         subMenu.forEach((value: MenuItem) => {
            childMenu.push({
               id: value.textKey,
               text: value.displayName,
               link: value.textKey.toLowerCase(),
               data: value.url
            });
         });

         this.menuArray.push({
            id: item,
            text: this.lookupDisplayText(item),
            subMenu: childMenu
         });
      });
   }

   public lookupDisplayText(textKey: string): string {
      // Regex found at https://stackoverflow.com/a/7225450/1195056
      const result = textKey.replace(/([A-Z])/g, ' $1');

      return result.charAt(0).toUpperCase() + result.slice(1);
   }
}
