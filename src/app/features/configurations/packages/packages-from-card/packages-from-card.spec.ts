import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../admin.service';
import { PackagesFromCard } from './packages-from-card';

describe('PackagesFromCard validation', () => {
  let component: PackagesFromCard;

  beforeEach(() => {
    component = new PackagesFromCard(
      {} as AdminService,
      { markForCheck: vi.fn() } as unknown as ChangeDetectorRef,
      { instant: vi.fn((key: string) => key) } as unknown as TranslateService,
    );
  });

  it('disables the details step until every required input is valid', () => {
    expect(component.currentStepInvalid).toBe(true);

    component.packageForm.patchValue({
      nameEng: 'Cairo Discovery',
      metaTitleEng: 'Cairo Discovery Travel Package',
      metaTitleAr: 'باقة اكتشاف القاهرة السياحية',
      metaDescriptionEng: 'Book a complete Cairo travel package with guided tours, flexible dates and expert support.',
      metaDescriptionAr: 'احجز باقة سياحية متكاملة لاكتشاف القاهرة مع جولات منظمة ودعم من خبراء السفر.',
      nameAr: 'اكتشاف القاهرة',
      descriptionEng: 'A complete Cairo travel package.',
      descriptionAr: 'باقة سفر متكاملة إلى القاهرة.',
      durationDays: 3,
      durationHours: 0,
      pricePerPerson: 200,
      pricePerChild: 100,
      maxCapacity: 20,
      cancellationPolicy: 'Cancellation is allowed up to 48 hours before departure.',
      dateFrom: '2030-01-01',
      dateTo: '2030-01-05',
      destinationIds: [1],
    });

    expect(component.detailsStepInvalid).toBe(false);
    expect(component.currentStepInvalid).toBe(false);

    component.packageForm.controls.dateTo.setValue('2029-12-31');
    expect(component.currentStepInvalid).toBe(true);
  });

  it('disables the images and itinerary steps until their content is valid', () => {
    component.savedPackageId = 10;
    component.activeStep = 2;
    expect(component.currentStepInvalid).toBe(true);

    component.packageForm.controls.images.setValue(['/images/package.webp']);
    expect(component.currentStepInvalid).toBe(false);

    component.activeStep = 3;
    expect(component.currentStepInvalid).toBe(true);
  });
});
