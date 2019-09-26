import { PanelTitle } from './panel-title.model';
import { Type } from '@angular/core';

export interface PanelBodySingle extends PanelTitle {
   bodyContent: Type<any>;
}
