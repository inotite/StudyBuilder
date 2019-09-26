import { ListItem } from './list-item.model';

export interface ListItemLink extends ListItem {
  link: string;
  data: string;
}
