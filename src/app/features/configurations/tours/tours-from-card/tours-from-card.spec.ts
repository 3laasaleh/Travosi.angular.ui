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
      routeName: 'cairo-highlights',

      descriptionEng: 'Explore the most important Cairo landmarks.',
      descriptionAr: 'استكشف أهم معالم القاهرة.',
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
      isFreeCancelation: true,
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

  it('uses hours only for a one-day tour and restores a minimum of one day', () => {
    component.tourForm.controls.durationDays.setValue(4);
    component.tourForm.controls.durationHours.setValue(0);
    component.tourForm.controls.isOneDayTour.setValue(true);

    component.onOneDayTourChanged();

    expect(component.tourForm.controls.durationDays.disabled).toBe(true);
    expect(component.tourForm.controls.durationDays.value).toBe(0);
    expect(component.tourForm.controls.durationHours.value).toBe(1);
    expect(component.tourForm.hasError('invalidTourDuration')).toBe(false);

    component.tourForm.controls.isOneDayTour.setValue(false);
    component.onOneDayTourChanged();

    expect(component.tourForm.controls.durationDays.enabled).toBe(true);
    expect(component.tourForm.controls.durationDays.value).toBe(1);
    component.tourForm.controls.durationHours.setValue(0);
    expect(component.tourForm.hasError('invalidTourDuration')).toBe(false);
  });

  it('allows the tour availability dates to remain empty', () => {
    component.tourForm.controls.startDate.setValue('');
    component.tourForm.controls.endDate.setValue('');

    expect(component.tourForm.hasError('invalidDateRange')).toBe(false);
    expect(component.tourForm.controls.startDate.hasError('required')).toBe(false);
    expect(component.tourForm.controls.endDate.hasError('required')).toBe(false);
  });

  it('validates tour content and cancellation items like package items', () => {
    component.addHighlight();
    component.addInclude();
    component.addExclude();
    component.addCancellationPolicy();

    for (const collection of [
      component.highlightsArray,
      component.includesArray,
      component.excludesArray,
      component.cancellationPoliciesArray,
    ]) {
      const item = collection.at(0);
      expect(item.invalid).toBe(true);

      item.patchValue({ valueEng: '   ', valueAr: '\u0642\u064a\u0645\u0629' });
      expect(item.controls['valueEng'].hasError('pattern')).toBe(true);

      item.patchValue({ valueEng: 'Included service', valueAr: '\u0642\u064a\u0645\u0629' });
      expect(item.valid).toBe(true);

      item.controls['valueEng'].setValue('x'.repeat(1001));
      expect(item.controls['valueEng'].hasError('maxlength')).toBe(true);
    }
  });

  it('keeps itinerary errors hidden until touch or save and leaves date and notes optional', () => {
    component.validationSubmitted = true;
    component.errorMessage = 'pleaseCorrectFormErrors';

    component.openItineraryStepEditor();

    expect(component.validationSubmitted).toBe(false);
    expect(component.errorMessage).toBe('');
    expect(component.itineraryDraft!.controls['titleEng'].touched).toBe(false);
    expect(component.itineraryDraft!.controls['arrivalDate'].hasError('required')).toBe(false);
    expect(component.itineraryDraft!.controls['notesEng'].hasError('required')).toBe(false);
    expect(component.itineraryDraft!.controls['notesAr'].hasError('required')).toBe(false);

    component.saveItineraryStep();

    expect(component.itineraryDraft!.controls['titleEng'].touched).toBe(true);
    expect(component.itineraryDraft!.controls['valueEng'].touched).toBe(true);
    expect(component.itineraryDraft!.controls['startTime'].touched).toBe(true);
  });

  it('loads and saves itinerary steps in ascending insertion order', () => {
    (component as any).setItinerary([
      { id: 3, orderNumber: 3, titleEng: 'Step 3' },
      { id: 2, orderNumber: 2, titleEng: 'Step 2' },
      { id: 1, orderNumber: 1, titleEng: 'Step 1' },
    ]);

    expect(component.itineraryArray.getRawValue().map((item) => item['titleEng']))
      .toEqual(['Step 1', 'Step 2', 'Step 3']);
    expect((component as any).buildItineraryPayload().map((item: any) => item.OrderNumber))
      .toEqual([1, 2, 3]);
  });

  it('saves an itinerary step without an optional date or notes', () => {
    component.openItineraryStepEditor();
    component.itineraryDraft!.patchValue({
      titleEng: 'Arrival',
      titleAr: '\u0627\u0644\u0648\u0635\u0648\u0644',
      valueEng: 'Meet at the hotel',
      valueAr: '\u0627\u0644\u0644\u0642\u0627\u0621 \u0641\u064a \u0627\u0644\u0641\u0646\u062f\u0642',
      startTime: '09:00',
      endTime: '10:00',
      arrivalDate: '',
      notesEng: '',
      notesAr: '',
    });

    expect(component.itineraryDraft!.valid).toBe(true);
    component.saveItineraryStep();
    expect(component.itineraryDraft).toBeNull();
    expect(component.itineraryArray.length).toBe(1);
  });
});
