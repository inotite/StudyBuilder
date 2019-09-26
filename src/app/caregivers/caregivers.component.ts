import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MuiTableColumn} from '../yprime-artifacts/components/mui-table/mui-table-column.model';
import {MuiTableControlType} from '../yprime-artifacts/components/mui-table/mui-table-controlType.model';
import {ExceptionService} from '../yprime-artifacts/services/exception.service';
import {CareGiver} from '../shared/models/caregiver.model';
// tslint:disable-next-line:max-line-length
import {InlineTableConsumerBaseComponent} from '../yprime-artifacts/components/mui-table/inline-table-consumer-base/inline-table-consumer-base.component';
import {HttpBasicCrudService} from '../yprime-artifacts/services/http-basic-crud.service';
import {careGiversUrl} from '../shared/helpers/url.constant';

@Component({
   selector: 'app-caregivers',
   templateUrl: './caregivers.component.html',
   styleUrls: ['./caregivers.component.scss']
})
export class CaregiversComponent extends InlineTableConsumerBaseComponent<CareGiver> implements OnInit {
   // columnNames remain in dervied class, as the data source for dropdowns can be from various sources
   // and we can accept array as dataSource, the dervied component assumes this responsiblity.
   // Offloading to base can violate S-of-SOLID.
   columnNames: Array<MuiTableColumn> = [
      <MuiTableColumn>{id: 'id', isKey: true},
      <MuiTableColumn>{
         id: 'name',
         isVisible: true,
         MuiTableControlType: MuiTableControlType.Text,
         width: 300,
         isRequired: true,
         maxLength: 60,
         canBeAdded: true,
         canBeEdited: true,
         columnDisplayName: 'Caregiver name'
      },
      <MuiTableColumn>{
         id: 'actionPanel',
         isVisible: true,
         columnDisplayName: '',
         helpText: 'Cannot be deleted or modified because it is tied to subject',
         MuiTableControlType: MuiTableControlType.DataDrivenActionPanel
      }
   ];

   constructor(private title: Title, exceptionService: ExceptionService, httpBasicCrudService: HttpBasicCrudService) {
      super(exceptionService, httpBasicCrudService);

      // set title here to esure it can be tested
      this.title.setTitle('Caregivers');

      // provide properties for the base component.
      this.apiUrl = careGiversUrl;
      this.entityDisplayName = 'Caregiver';
   }

   ngOnInit() {
      super.ngOnInit();
   }
}
