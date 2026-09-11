import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';
import { ApiService } from '../../../../core/services/apiservice.service';
import { PaginationModel } from '../../../../shared/models/pagination.model';
import { DestinationHomeDTO } from './destination.model';

@Component({
  selector: 'app-destinations-section',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './destinations-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsSection implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  destinations: DestinationHomeDTO[] = [];
  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.hasError = false;

    this.apiService
      .getUnauthntecated<IGenericResponse<PaginationModel<DestinationHomeDTO>>>('destinations?page=1&pageSize=12')
      .pipe(
        catchError(() => {
          this.hasError = true;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        if (response === null) {
          this.destinations = [];
          return;
        }

        this.destinations = response.data.data.slice(0, 12);
      });
  }

  destinationName(destination: DestinationHomeDTO): string {
    return destination.title;
  }

  destinationDescription(destination: DestinationHomeDTO): string {
    return destination.subDescription ?? destination.description ?? '';
  }

  imageUrl(destination: DestinationHomeDTO): string {
    const url = destination.images[0]?.imageUrl ?? '';

    if (!url) return 'assets/images/bg/2.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;

    return `${environment.imageUrl.replace(/\/+$/, '')}/${String(url).replace(/^\/+/, '')}`;
  }
}
