import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MuiTableColumn} from '../yprime-artifacts/components/mui-table/mui-table-column.model';
import {MuiTableControlType} from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';
import {ExceptionService} from '../yprime-artifacts/services/exception.service';
// tslint:disable-next-line:max-line-length
import {InlineTableConsumerBaseComponent} from '../yprime-artifacts/components/mui-table/inline-table-consumer-base/inline-table-consumer-base.component';
import {HttpBasicCrudService} from '../yprime-artifacts/services/http-basic-crud.service';
import {countryUrl} from '../shared/helpers/url.constant';
import {MuiTableColumnSource} from '../yprime-artifacts/components/mui-table/mui-table-column-source.model';
import {Country} from '../shared/models/country.model';
import {SetupService} from '../shared/services/setup.service';
import {DynamicTableData} from '../yprime-artifacts/components/mui-table/mui-table-dynamic-data.model';

@Component({
   selector: 'app-countries',
   templateUrl: './countries.component.html',
   styleUrls: ['./countries.component.scss']
})
export class CountriesComponent extends InlineTableConsumerBaseComponent<Country> implements OnInit {
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
         columnDisplayName: 'Country',
         width: 255,
         MuiTableControlType: MuiTableControlType.SingleDropdown,
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'name',
            textKeyName: 'name',
            columnId: 'name',
            syncOnAction: true,
            syncSourceIndex: 0
         }
      },
      <MuiTableColumn>{
         id: 'shortName',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: false,
         MuiTableControlType: MuiTableControlType.Label,
         columnDisplayName: 'Country Code'
      },
      <MuiTableColumn>{
         id: 'use24HourTime',
         isVisible: true,
         isRequired: false,
         width: 125,
         MuiTableControlType: MuiTableControlType.Slider,
         maxLength: 60,
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: '12-hour time'
      },
      <MuiTableColumn>{
         id: 'useMetric',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         width: 125,
         MuiTableControlType: MuiTableControlType.Slider,
         columnDisplayName: 'Metric Units'
      },
      <MuiTableColumn>{
         id: 'languages',
         isVisible: true,
         canBeAdded: true,
         canBeEdited: true,
         isRequired: true,
         width: 255,
         helpText: 'This is the list of Languages added to the study.',
         MuiTableControlType: MuiTableControlType.MultiChoiceDropdown,
         columnDisplayName: 'Language(s)',
         columnDataSource: <MuiTableColumnSource>{
            idKeyName: 'id',
            textKeyName: 'name',
            columnId: 'languages',
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
      this.title.setTitle('Countries');

      // provide properties for the base component.
      this.apiUrl = countryUrl;
      this.entityDisplayName = 'Country';
      this.dynamicData = [
         <DynamicTableData>{
            index: 0,
            data: [],
            dynamicDataSource: this.setupService.getAvailableCountries$()
         }
      ];
   }

   ngOnInit() {
      super.ngOnInit();
   }
}
