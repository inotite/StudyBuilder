import { Type } from '@angular/core';
import { PanelTitle } from './panel-title.model';

export interface PanelBodyDouble extends PanelTitle {
   leftContent: Type<any>;
   rightContent: Type<any>;
}
