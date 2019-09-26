import { Type } from '@angular/core';
import { PanelTitle } from './panel-title.model';

export interface PanelBodyTriple extends PanelTitle {
   leftContent: Type<any>;
   middleContent: Type<any>;
   rightContent: Type<any>;
}
