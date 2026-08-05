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
import { catchError, finalize, forkJoin, of, switchMap } from 'rxjs';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { ApiService } from '../../../core/services/apiservice.service';
import { VisitorTrackingService } from '../../../core/services/visitor-tracking.service';
import { environment } from '../../../../environments/environment';
import { AgencyOne } from '../../../shared/components/agency-one/agency-one';
import { TeamOne, TeamMember } from '../../../shared/components/team-one/team-one';
import { UsersOne } from '../../../shared/components/users-one/users-one';

@Component({
  selector: 'app-about-us',
  imports: [
    RouterLink,
    HomeNavbar,
    AgencyOne,
    TeamOne,
    UsersOne,
    FooterOne,
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './about-us.html',
})
export class AboutUs implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly visitorTracking = inject(VisitorTrackingService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetector = inject(ChangeDetectorRef);

  cta = 'assets/images/bg/cta.jpg';
  agents: TeamMember[] = [];
  visitorTotal = 0;
  packageTotal = 0;
  isLoading = true;

  ngOnInit(): void {
    this.visitorTracking
      .track()
      .pipe(
        switchMap(() =>
          forkJoin({
            agents: this.apiService
              .getUnauthntecated('AboutUs/Agents')
              .pipe(catchError(() => of(null))),
            statistics: this.apiService
              .getUnauthntecated('AboutUs/Statistics')
              .pipe(catchError(() => of(null))),
          }),
        ),
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ agents, statistics }) => {
        const agentData = this.responseData(agents);
        this.agents = Array.isArray(agentData)
          ? agentData.map((agent: any) => this.mapAgent(agent))
          : [];

        const statisticData = this.responseData(statistics) ?? {};
        this.visitorTotal = this.nonNegativeNumber(
          statisticData.totalVisitors ?? statisticData.TotalVisitors,
        );
        this.packageTotal = this.nonNegativeNumber(
          statisticData.totalPackages ?? statisticData.TotalPackages,
        );
        this.changeDetector.markForCheck();
      });
  }

  private responseData(response: any): any {
    if (!response || response.isSuccess === false || response.IsSuccess === false) return null;
    return response.data ?? response.Data ?? response;
  }

  private mapAgent(agent: any): TeamMember {
    const firstName = String(agent?.firstName ?? agent?.FirstName ?? '').trim();
    const lastName = String(agent?.lastName ?? agent?.LastName ?? '').trim();
    const name = [firstName, lastName].filter(Boolean).join(' ') || 'Travel Agent';

    return {
      id: this.nonNegativeNumber(agent?.id ?? agent?.Id),
      name,
      email: String(agent?.email ?? agent?.Email ?? '').trim(),
      position: 'Travel Agent',
      image: this.agentImage(agent?.profileImageUrl ?? agent?.ProfileImageUrl),
    };
  }

  private agentImage(value: unknown): string {
    const image = String(value ?? '').trim();
    if (!image) return '';
    if (/^(https?:|data:|blob:)/i.test(image)) return image;

    const relativePath = image.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${relativePath}`;
  }

  private nonNegativeNumber(value: unknown): number {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
  }
}
