import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageStatusEnum } from '../enums/messagestatus.enum';
import { AuthService } from '../../features/user/_services/auth.service';
import { IGenericResponse } from '../models/genericReponse.model';
import { ToasterService } from '../services/toaster.service';
import { LoaderService } from '../services/loader.service';
@Injectable()
export class Global_Interceptor implements HttpInterceptor {
  constructor(private toaster: ToasterService,
    private authService: AuthService,
    public loadingService: LoaderService) {
  }
  isResponseModel<T>(obj: any):  IGenericResponse<T> {
    return obj && typeof obj.isSuccess === 'boolean' && 'data' in obj;
  }
  private totalRequests = 0;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      catchError((err) => {
        if ( err.status == 401) {
          this.authService.logout();
        }
        else {
          this.toaster.addToaster(MessageStatusEnum.Error,  err.message,MessageStatusEnum.Error);
         
          if(err?.error?.errors)
          {
           Object.values(err.error.errors).forEach((element: any) => {
              this.toaster.addToaster(MessageStatusEnum.Error,  element[0]);
            })
          }
       
          if (this.totalRequests > 0)
            this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        }
        throw new Error(err.name);

      }),
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          let isResponseModel = this.isResponseModel(evt.body);
          if (this.totalRequests > 0)
            this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
          if (!isResponseModel)
            return;
          let response: IGenericResponse<any> = evt.body;
          debugger;
          if (!response?.isSuccess && response?.message != "" &&response.statusCode!=500)
            this.toaster.addToaster(MessageStatusEnum.Error,  response.message);

          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        }

      })
    );
  }
}