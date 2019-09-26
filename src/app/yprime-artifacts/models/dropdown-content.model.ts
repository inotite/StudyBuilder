import { DropdownItem } from './dropdown-item.model';

export interface DropdownContent<TId> {
  placeholder: string;
  selectedItem: TId;
  items: DropdownItem<TId>[];
}
