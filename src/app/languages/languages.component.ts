import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MuiTableColumn} from '../yprime-artifacts/components/mui-table/mui-table-column.model';
import {MuiTableControlType} from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';
import {ExceptionService} from '../yprime-artifacts/services/exception.service';
import {CareGiver} from '../shared/models/caregiver.model';
// tslint:disable-next-line:max-line-length
import {InlineTableConsumerBaseComponent} from '../yprime-artifacts/components/mui-table/inline-table-consumer-base/inline-table-consumer-base.component';
import {HttpBasicCrudService} from '../yprime-artifacts/services/http-basic-crud.service';
import {languageUrl} from '../shared/helpers/url.constant';
import {MuiTableColumnSource} from '../yprime-artifacts/components/mui-table/mui-table-column-source.model';
import {Language} from '../shared/models/language.model';
import {SetupService} from '../shared/services/setup.service';
import {DynamicTableData} from '../yprime-artifacts/components/mui-table/mui-table-dynamic-data.model';

@Component({
   selector: 'app-languages',
   templateUrl: './languages.component.html',
   styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent extends InlineTableConsumerBaseComponent<Language> implements OnInit {
   // columnNames remain in dervied class, as the data source for dropdowns can be from various sources
   // and we can accept array as dataSource, the dervied component assumes this responsiblity.
   // Offloading to base can violate S-of-SOLID.
   columnNames: Array<MuiTableColumn> = [
      <MuiTableColumn>{id: 'id', isVisible: false, isKey: true},
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         isRequired: true,
         columnDisplayName: 'Language',
         width: 255,
         MuiTableControlType: MuiTableControlType.SingleDropdown,
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'cultureName',
            textKeyName: 'name',
            columnId: 'cultureName',
            syncOnAction: true,
            syncSourceIndex: 0
         }
      },
      <MuiTableColumn>{
         id: 'cultureName',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.Label,
         columnDisplayName: 'Culture Code'
      },
      <MuiTableColumn>{
         id: 'displayName',
         isVisible: true,
         isRequired: true,
         width: 255,
         MuiTableControlType: MuiTableControlType.Text,
         maxLength: 60,
         helpText: 'This will be displayed to user when selecting a language',
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: 'Display Name'
      },
      <MuiTableColumn>{
         id: 'isDefault',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         width: 125,
         helpText: 'This is the Study Builder default Language',
         uniqueConstraintnMessage: 'is currently set as default. Would you like to replace the default Language?',
         MuiTableControlType: MuiTableControlType.Slider,
         columnDisplayName: 'Default',
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'displayName',
            textKeyName: 'Default',
            columnId: 'isDefault',
            syncOnAction: true,
            syncSourceIndex: 1
         }
      },
      <MuiTableColumn>{
         id: 'translationApproved',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: true,
         MuiTableControlType: MuiTableControlType.Slider,
         columnDisplayName: 'Translation Approved'
      },
      <MuiTableColumn>{
         id: 'isRightToLeft',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.ReadOnlyCheck,
         columnDisplayName: 'Right to Left'
      },
      <MuiTableColumn>{
         id: 'countries',
         isVisible: true,
         canBeAdded: false,
         canBeEdited: false,
         helpText: 'The list of Countries this Language has been associated to',
         MuiTableControlType: MuiTableControlType.ReadOnlyList,
         columnDisplayName: 'Countries'
      },
      <MuiTableColumn>{
         id: 'actionPanel',
         isVisible: true,
         columnDisplayName: '',
         acknowledgementText: 'This Language is associated with a Country. Please update Countries before deleting this Language.',
         helpText: 'is currently set as default. To delete please select another default language.',
         helpTextColumnRef: 'name',
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
      this.title.setTitle('Languages');

      // provide properties for the base component.
      this.apiUrl = languageUrl;
      this.entityDisplayName = 'Language';
      this.dynamicData = [
         <DynamicTableData>{
            index: 0,
            data: [],
            dynamicDataSource: this.setupService.getAvailableLanguages$()
         },
         <DynamicTableData>{
            index: 1,
            data: [],
            dynamicDataSource: this.setupService.getDefaultLanguage$()
         }
      ];
   }

   ngOnInit() {
      super.ngOnInit();
   }
}
