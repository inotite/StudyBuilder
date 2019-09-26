import { TestBed, async } from '@angular/core/testing';

import { StudySettingsService } from './study-settings.service';
import { studySettingsUrl } from '../helpers/url.constant';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudySettingsService', () => {
  let service: StudySettingsService;
  let httpMock: HttpTestingController;
  let studySettingsCollection: object;
  const section = 'StudyWide';
  const group = 'General';
  const url = (studySettingsUrl.endsWith('/')
      ? studySettingsUrl
      : studySettingsUrl + '/') + section + '/' + group + '/';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [StudySettingsService],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);

    studySettingsCollection = {
      sponserName: 'Jon',
      studyName: 'angular',
      protocalNumber: '192081841',
      studyID: 'iwu8a0difjw932',
      siteNumberLength: 10,
      dataExportDelimiter: ',',
      screeningCapGlobal: 4,
      randomizationCapGlobal: 4,
      attachPDFConfirmationtoeMail: false,
      yPrimeLogoURL: 'logo.png',
      zenDeskDCFURL: 'dcf',
      zenDeskDCFUserID: 'Dmytro',
      zenDeskDCFUserToken: '92834j2kj34k23j5r0982u3jaslkdjf09sadf',
      zenDeskDCFGroupID: 'newbie',
      zenDeskDCFCustomFields: 'custom field?'
    };

    service = TestBed.get(StudySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when created will not make the HTTP get call', () => {
    httpMock.expectNone(url);
    httpMock.verify();
  });

  it('#getStudySettingsCollection should make a http call', () => {
    service.getStudySettingsCollection(section, group);
    httpMock.expectOne(url).flush(studySettingsCollection);

    httpMock.verify();
 });

 it('#getStudySettingsCollection should return an observable object of study settings collection', () => {
    let result: object;

    service.getStudySettingsCollection(section, group).subscribe((data: object) => (result = data));

    httpMock.expectOne(url).flush(studySettingsCollection);

    expect(result).toEqual(studySettingsCollection);

    httpMock.verify();
 });
});
