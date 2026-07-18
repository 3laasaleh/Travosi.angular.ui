import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  _imgUrl = environment.imageUrl;
  defaultImage: string = '/assets/images/parts-trans.png';
  loader: string = '/assets/loaders/loader.gif';

  constructor(private _coockiesService:CookieService) { }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultImage;
  }
  onImageStartLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.loader;
  }

  getHeaders() {
    const bearer = 'Bearer ' + this._coockiesService.get('token');
    return {
      headers: new HttpHeaders
        ({
          'Authorization': bearer,
          'Content-Type': 'application/json'

        })
    }
  }


}