import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DragDropListItem } from './drag-drop-listItem.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.scss']
})
export class DragDropListComponent implements OnInit {
  @Input() availableItems: DragDropListItem[];
  @Input() selectedItems: DragDropListItem[];

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
