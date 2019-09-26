import { ListItem } from './list-item.model';

export interface ListItemParent extends ListItem {
  subMenu: ListItem[];
}
