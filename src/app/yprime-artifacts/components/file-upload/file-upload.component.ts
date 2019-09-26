import {Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy} from '@angular/core';
import {FileItem} from '../../models/file-item.model';

@Component({
   selector: 'app-file-upload',
   changeDetection: ChangeDetectionStrategy.OnPush,
   templateUrl: './file-upload.component.html',
   styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
   @Output() fileSelectAction = new EventEmitter<File>();
   @Input() fileNotSelected: boolean;
   constructor() {}

   ngOnInit() {}

   onFileChange(event) {
      const file = event.target.files[0];
      this.fileSelectAction.emit(file);
   }
}
