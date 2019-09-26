import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpBasicCrudService } from 'src/app/yprime-artifacts/services/http-basic-crud.service';
import { Language } from '../models/language.model';
import { languageUrl, businessRuleUrl } from '../helpers/url.constant';
import { Country } from '../models/country.model';
import { countryUrl } from '../helpers/url.constant';
import { MuiOption } from 'src/app/yprime-artifacts/components/mui-table/mui-option.model';
import { map } from 'rxjs/operators';
import { Image } from '../models/image.model';
import { imageUrl } from '../helpers/url.constant';
import { BusinessRuleItem } from '../models/business-rule-item.model';

@Injectable({
   providedIn: 'root'
})
export class SetupService {
   constructor(private readonly httpBasicCrudService: HttpBasicCrudService) {}

   isAuthenticatedUser$(): Observable<boolean> {
      return of(true);
   }

   getBusinessRules$(): Observable<MuiOption[]> {
      return this.httpBasicCrudService
         .get$<BusinessRuleItem>(businessRuleUrl)
         .pipe(
            map(res => {
               const options = Array<MuiOption>();
               res.forEach(value => {
                  options.push(<MuiOption>{
                     id: value.id,
                     name: value.description
                  });
               });
               return options;
            })
         );
   }

   getAvailableCountries$(): Observable<Country[]> {
      return this.httpBasicCrudService.get$<Country>(
         countryUrl + '/ConfigurableCountries'
      );
   }

   getStudyCountries$(): Observable<MuiOption[]> {
      return this.httpBasicCrudService.get$<Country>(countryUrl).pipe(
         map(res => {
            const options = Array<MuiOption>();
            res.forEach(value => {
               options.push(<MuiOption>{
                  id: value.id,
                  name: value.name
               });
            });
            return options;
         })
      );
   }

   getAvailableLanguages$(): Observable<Language[]> {
      return this.httpBasicCrudService.get$<Language>(
         languageUrl + '/ConfigurableLanguages'
      );
   }

   getStudyLanguages$(): Observable<MuiOption[]> {
      return this.httpBasicCrudService.get$<Language>(languageUrl).pipe(
         map(res => {
            const options = Array<MuiOption>();
            res.forEach(value => {
               options.push(<MuiOption>{
                  id: value.id,
                  name: value.displayName
               });
            });
            return options;
         })
      );
   }

   getDefaultLanguage$(): Observable<MuiOption[]> {
      return this.httpBasicCrudService
         .getData$<Language>(languageUrl + '/Default')
         .pipe(
            map(res => {
               return [<MuiOption>{ id: 'id', name: res.displayName }];
            })
         );
   }

   getStudyImages$(): Observable<MuiOption[]> {
      return this.httpBasicCrudService.get$<Image>(imageUrl).pipe(
         map(res => {
            const options = Array<MuiOption>();
            res.forEach(value => {
               options.push(<MuiOption>{
                  id: value.id,
                  name: value.displayName
               });
            });
            return options;
         })
      );
   }
}
