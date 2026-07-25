import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-destinations-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './destinations-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsFromCard {
  @Input({ required: true }) destinationForm!: FormGroup;
  @Input() imageUploads: any[] = [];
  @Input() selectedDestination: any = null;
  @Input() isLoading = false;
  @Input() maxImages = 5;
  @Output() saveDestination = new EventEmitter<void>();
  @Output() imagesSelected = new EventEmitter<Event>();
  @Output() imageRemoved = new EventEmitter<number>();
  @Output() editCancelled = new EventEmitter<void>();
}
