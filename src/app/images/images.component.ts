import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MuiTableColumn } from '../yprime-artifacts/components/mui-table/mui-table-column.model';
import { MuiTableControlType } from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';
import { ExceptionService } from '../yprime-artifacts/services/exception.service';
// tslint:disable-next-line:max-line-length
import { InlineTableConsumerBaseComponent } from '../yprime-artifacts/components/mui-table/inline-table-consumer-base/inline-table-consumer-base.component';
import { HttpBasicCrudService } from '../yprime-artifacts/services/http-basic-crud.service';
import { imageUrl } from '../shared/helpers/url.constant';
import { MuiTableColumnSource } from '../yprime-artifacts/components/mui-table/mui-table-column-source.model';
import { Image } from '../shared/models/image.model';
import { SetupService } from '../shared/services/setup.service';
import { DynamicTableData } from '../yprime-artifacts/components/mui-table/mui-table-dynamic-data.model';

@Component({
   selector: 'app-images',
   templateUrl: './images.component.html',
   styleUrls: ['./images.component.scss']
})
export class ImagesComponent extends InlineTableConsumerBaseComponent<Image>
   implements OnInit {
   // columnNames remain in dervied class, as the data source for dropdowns can be from various sources
   // and we can accept array as dataSource, the dervied component assumes this responsiblity.
   // Offloading to base can violate S-of-SOLID.
   columnNames: Array<MuiTableColumn> = [
      <MuiTableColumn>{ id: 'id', isVisible: false, isKey: true },
      <MuiTableColumn>{
         id: 'imageContent',
         isVisible: false,
         canBeAdded: true,
         canBeEdited: false,
         isRequired: true,
         columnDisplayName: 'Upload Image',
         width: 255,
         MuiTableControlType: MuiTableControlType.FileUpload
      },
      <MuiTableColumn>{
         id: 'view',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: false,
         width: 30,
         MuiTableControlType: MuiTableControlType.ViewFile
      },
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         isRequired: true,
         width: 255,
         MuiTableControlType: MuiTableControlType.Text,
         maxLength: 60,
         helpText: 'This will be displayed to user when selecting a image',
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: 'Display Name'
      },
      <MuiTableColumn>{
         id: 'size',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.Label,
         columnDisplayName: 'File Size',
         pipeForDisplay: 'formatBytes'
      },
      <MuiTableColumn>{
         id: 'languageName',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: false,
         columnDisplayName: 'Language',
         width: 255,
         MuiTableControlType: MuiTableControlType.SingleDropdown,
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'id',
            textKeyName: 'name',
            columnId: 'languageId',
            syncOnAction: false,
            staticDataSource: this.setupService.getStudyLanguages$(),
            syncSourceIndex: -1
         }
      },
      <MuiTableColumn>{
         id: 'actionPanel',
         isVisible: true,
         columnDisplayName: '',
         MuiTableControlType: MuiTableControlType.DataDrivenActionPanel
      }
   ];

   constructor(
      private title: Title,
      private setupService: SetupService,
      exceptionService: ExceptionService,
      httpBasicCrudService: HttpBasicCrudService
   ) {
      super(exceptionService, httpBasicCrudService);

      // set title here to esure it can be tested
      this.title.setTitle('Images');

      // provide properties for the base component.
      this.apiUrl = imageUrl;
      this.entityDisplayName = 'Image';
   }

   ngOnInit() {
      super.ngOnInit();
   }
}
