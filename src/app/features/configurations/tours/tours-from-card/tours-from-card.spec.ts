import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../admin.service';
import { ToursFromCard } from './tours-from-card';

describe('ToursFromCard validation', () => {
  let component: ToursFromCard;

  beforeEach(() => {
    component = new ToursFromCard(
      {} as AdminService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: vi.fn((key: string) => key) } as unknown as TranslateService,
    );
  });

  it('disables the details step until every required input is valid', () => {
    expect(component.currentStepInvalid).toBe(true);

    component.tourForm.patchValue({
      titleEng: 'Cairo Highlights',
      titleAr: 'معالم القاهرة',
      destinationId: 1,
      cityId: 2,
      pricePerPerson: 100,
      pricePerChild: 50,
      currencyId: 1,
      durationDays: 1,
      durationHours: 4,
      maxSeats: 15,
      startDate: '2030-01-01',
      endDate: '2030-01-02',
    });

    expect(component.detailsStepInvalid).toBe(false);
    expect(component.currentStepInvalid).toBe(false);

    component.tourForm.controls.endDate.setValue('2029-12-31');
    expect(component.currentStepInvalid).toBe(true);
  });

  it('disables the images and itinerary steps until their content is valid', () => {
    component.savedTourId = 12;
    component.activeStep = 2;
    expect(component.currentStepInvalid).toBe(true);

    component.tourForm.controls.images.setValue(['/images/tour.webp']);
    expect(component.currentStepInvalid).toBe(false);

    component.activeStep = 3;
    expect(component.currentStepInvalid).toBe(true);
  });
});
