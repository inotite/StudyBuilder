import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Url } from 'url';
import { imageUrl } from '../shared/helpers/url.constant';
import { ExceptionService } from '../yprime-artifacts/services/exception.service';
import { HttpBasicCrudService } from '../yprime-artifacts/services/http-basic-crud.service';
import { ImageView } from '../shared/models/image-view.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
   selector: 'app-image-view',
   templateUrl: './image-view.component.html',
   styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
   imageSrc: string;
   id: string;
   errorMessage = '';
   constructor(
      private title: Title,
      private exceptionService: ExceptionService,
      private httpBasicCrudService: HttpBasicCrudService,
      private route: ActivatedRoute
   ) {}

   ngOnInit() {
      this.route.params
         .pipe(
            map(params => {
               this.id = params['id'];
            }),
            switchMap(() =>
               this.httpBasicCrudService.getById$<ImageView>(imageUrl, this.id)
            )
         )
         .subscribe(
            res => {
               this.imageSrc = res.source;
               this.title.setTitle(res.imageName.split('.')[0]);
            },
            err => {
               this.errorMessage = this.exceptionService.getUserDisplayMessage(
                  err
               );
            }
         );
   }
}
