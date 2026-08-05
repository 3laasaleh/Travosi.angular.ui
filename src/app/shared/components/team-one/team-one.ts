import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface TeamMember {
  id: number;
  image: string;
  name: string;
  position: string;
  email: string;
}

@Component({
  selector: 'app-team-one',
  imports: [TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './team-one.html',
})
export class TeamOne {
  @Input() teamData: TeamMember[] = [];
  @Input() isLoading = false;
  private failedImageIds = new Set<number>();

  hasProfileImage(member: TeamMember): boolean {
    return Boolean(member.image) && !this.failedImageIds.has(member.id);
  }

  showAvatarIcon(memberId: number): void {
    this.failedImageIds = new Set(this.failedImageIds).add(memberId);
  }
}
